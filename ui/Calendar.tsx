'use client'

import { useEffect, useState } from 'react'
import Button from '@/ui/Button'

const CalendarSection = () => {
	const [selectedDate, setSelectedDate] = useState<string | null>(null)
	const [selectedTime, setSelectedTime] = useState<string | null>(null)
	const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
	const [availableSlots, setAvailableSlots] = useState<
		Record<string, string[]>
	>({})

	// Массив заблокированных дат (в формате 'YYYY-MM-DD')
	const blockedDates = ['2025-06-27']

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const now = new Date()
				const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
				const lastDayOfNextMonth = new Date(
					now.getFullYear(),
					now.getMonth() + 2,
					0
				)

				const response = await fetch(
					`https://www.googleapis.com/calendar/v3/calendars/yanasabada1@gmail.com/events?` +
						`key=AIzaSyAKbkQxAlUHUT3jK2EFFfFzRk4LegDlUHs&` +
						`timeMin=${encodeURIComponent(firstDayOfMonth.toISOString())}&` +
						`timeMax=${encodeURIComponent(lastDayOfNextMonth.toISOString())}&` +
						`singleEvents=true&orderBy=startTime`
				)

				const data = await response.json()

				// Получаем все занятые периоды
				const busyPeriods = data.items
					.filter(
						(event: {
							start?: { dateTime?: string }
							end?: { dateTime?: string }
						}) => event.start?.dateTime && event.end?.dateTime
					)
					.map(
						(event: {
							start?: { dateTime?: string }
							end?: { dateTime?: string }
						}) => ({
							start: new Date(event.start?.dateTime ?? ''),
							end: new Date(event.end?.dateTime ?? ''),
						})
					)

				// Генерируем все возможные слоты (по 1 часу) с 12:00 до 20:00
				const allSlots = generateAllSlots(
					firstDayOfMonth,
					lastDayOfNextMonth,
					'12:00',
					'20:00',
					60
				)

				// Фильтруем свободные слоты
				const freeSlots = allSlots.filter(slot => {
					const slotStart = new Date(`${slot.date}T${slot.time}:00`)
					const slotEnd = new Date(slotStart.getTime() + 60 * 60000)

					return !busyPeriods.some(
						(busy: { start: Date; end: Date }) =>
							slotStart < busy.end && slotEnd > busy.start
					)
				})

				// Группируем по датам
				const slotsByDate = freeSlots.reduce<Record<string, string[]>>(
					(acc, slot) => {
						if (!acc[slot.date]) acc[slot.date] = []
						acc[slot.date].push(slot.time)
						return acc
					},
					{}
				)

				setAvailableSlots(slotsByDate)
			} catch (error) {
				console.error('Error:', error)
			}
		}

		fetchEvents()
	}, [])

	function generateAllSlots(
		startDate: Date,
		endDate: Date,
		startTime: string,
		endTime: string,
		duration: number
	) {
		const slots = []
		const [startH, startM] = startTime.split(':').map(Number)
		const [endH, endM] = endTime.split(':').map(Number)

		const currentDate = new Date(startDate)

		while (currentDate <= endDate) {
			const dayOfWeek = currentDate.getDay() // 0 - воскресенье, 4 - четверг, 6 - суббота

			// Пропускаем четверги (4), субботы (6) и воскресенья (0)
			if (dayOfWeek !== 0 && dayOfWeek !== 4 && dayOfWeek !== 6) {
				const dateStr = `${currentDate.getFullYear()}-${String(
					currentDate.getMonth() + 1
				).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`

				let hour = startH
				let minute = startM

				while (hour < endH || (hour === endH && minute <= endM)) {
					const time = `${hour.toString().padStart(2, '0')}:${minute
						.toString()
						.padStart(2, '0')}`
					slots.push({ date: dateStr, time })

					minute += duration
					if (minute >= 60) {
						hour += 1
						minute = 0
					}
				}
			}

			currentDate.setDate(currentDate.getDate() + 1)
		}

		return slots
	}

	// Генерация дней месяца
	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
	const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

	// Переключение месяцев
	const prevMonth = () => {
		if (currentMonth === 0) {
			setCurrentMonth(11)
			setCurrentYear(currentYear - 1)
		} else {
			setCurrentMonth(currentMonth - 1)
		}
	}

	const nextMonth = () => {
		if (currentMonth === 11) {
			setCurrentMonth(0)
			setCurrentYear(currentYear + 1)
		} else {
			setCurrentMonth(currentMonth + 1)
		}
	}

	// Проверка доступности даты
	const isDateAvailable = (day: number) => {
		const date = new Date(currentYear, currentMonth, day)
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const dayFormatted = String(date.getDate()).padStart(2, '0')
		const dateString = `${year}-${month}-${dayFormatted}`

		// Блокируем указанные даты
		if (blockedDates.includes(dateString)) {
			return false
		}

		// Блокируем четверги (4), субботы (6) и воскресенья (0)
		const dayOfWeek = date.getDay()
		if (dayOfWeek === 0 || dayOfWeek === 4 || dayOfWeek === 6) {
			return false
		}

		// Получаем слоты для конкретного дня
		const daySlots = availableSlots[dateString] || []

		// Получаем все возможные слоты с 12:00 до 20:00
		const allTimes = generateAllSlots(date, date, '12:00', '20:00', 60).map(
			s => s.time
		)

		// Считаем количество занятых слотов
		const busySlotsCount = allTimes.length - daySlots.length

		// Блокируем день, если 6 или более слотов заняты
		return busySlotsCount < 6
	}

	// Фильтрация слотов без окон
	function getContiguousSlots(slots: string[], allTimes: string[]): string[] {
		if (slots.length === 0) return []
		const busyTimes = allTimes.filter(t => !slots.includes(t))
		// Если нет занятых слотов — разрешаем все свободные, кроме 20:00
		if (busyTimes.length === 0) {
			return slots.filter(time => time !== '20:00')
		}
		return slots.filter(time => {
			if (time === '20:00') return false
			const idx = allTimes.indexOf(time)
			const prev = idx > 0 ? allTimes[idx - 1] : null
			const next = idx < allTimes.length - 1 ? allTimes[idx + 1] : null
			return (
				(prev && busyTimes.includes(prev)) || (next && busyTimes.includes(next))
			)
		})
	}

	// Обработчик выбора даты
	const handleDateSelect = (day: number) => {
		const date = new Date(currentYear, currentMonth, day)
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const dayFormatted = String(date.getDate()).padStart(2, '0')
		const dateString = `${year}-${month}-${dayFormatted}`

		if (availableSlots[dateString]) {
			setSelectedDate(dateString)
			setSelectedTime(null)
		}
	}

	// Обработчик выбора времени
	const handleTimeSelect = (time: string) => {
		setSelectedTime(time)
	}

	// Форматирование даты
	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
		}
		return new Date(dateString).toLocaleDateString('uk-UA', options)
	}

	return (
		<div
			id={'buy'}
			className='bg-white rounded-xl shadow-lg p-6 max-sm:p-0 w-[80%] max-sm:w-full'
		>
			<h3 className='text-2xl font-bold mb-6 text-center text-gray-900'>
				Оберіть дату та час
			</h3>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				{/* Календарь */}
				<div>
					<div className='flex justify-between items-center mb-4'>
						<button
							onClick={prevMonth}
							className='p-2 rounded-full hover:bg-gray-100 transition-colors'
						>
							<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
								<path
									fillRule='evenodd'
									d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
									clipRule='evenodd'
								/>
							</svg>
						</button>
						<h4 className='text-lg font-bold text-gray-900'>
							{new Date(currentYear, currentMonth).toLocaleDateString('uk-UA', {
								month: 'long',
								year: 'numeric',
							})}
						</h4>
						<button
							onClick={nextMonth}
							className='p-2 rounded-full hover:bg-gray-100 transition-colors'
						>
							<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
								<path
									fillRule='evenodd'
									d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
									clipRule='evenodd'
								/>
							</svg>
						</button>
					</div>

					<div className='grid grid-cols-7 gap-1 mb-2'>
						{['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'].map(day => (
							<div
								key={day}
								className='text-center text-sm text-gray-500 font-medium'
							>
								{day}
							</div>
						))}
					</div>

					<div className='grid grid-cols-7 gap-1'>
						{Array(firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1)
							.fill(null)
							.map((_, i) => (
								<div key={`empty-${i}`} className='h-10' />
							))}

						{days.map(day => {
							const isAvailable = isDateAvailable(day)
							const isSelected =
								selectedDate ===
								`${currentYear}-${String(currentMonth + 1).padStart(
									2,
									'0'
								)}-${String(day).padStart(2, '0')}`

							return (
								<button
									key={day}
									onClick={() => handleDateSelect(day)}
									disabled={!isAvailable}
									className={`h-10 rounded-full flex items-center justify-center cursor-pointer
                    ${isSelected ? 'bg-blue-600 text-white' : ''}
                    ${
											isAvailable
												? isSelected
													? 'bg-blue-600 text-white'
													: 'hover:bg-gray-100 text-gray-900'
												: 'text-gray-300 cursor-not-allowed'
										}
                  `}
								>
									{day}
								</button>
							)
						})}
					</div>
				</div>

				{/* Выбор времени */}
				<div>
					{selectedDate ? (
						<div className='max-sm:p-2'>
							<h4 className='text-lg font-bold text-gray-900 mb-4'>
								{formatDate(selectedDate)}
							</h4>
							<div className='grid grid-cols-2 gap-3'>
								{(() => {
									const allTimes = generateAllSlots(
										new Date(selectedDate + 'T00:00:00'),
										new Date(selectedDate + 'T00:00:00'),
										'12:00',
										'19:00',
										60
									).map(s => s.time)
									const filtered = getContiguousSlots(
										availableSlots[selectedDate],
										allTimes
									)
									return filtered.map(time => (
										<button
											key={time}
											onClick={() => handleTimeSelect(time)}
											className={`py-2 px-4 rounded-lg border transition-colors cursor-pointer
                        ${
													selectedTime === time
														? 'bg-blue-600 text-white border-blue-600'
														: 'border-gray-300 hover:bg-gray-50'
												}
                      `}
										>
											{time}
										</button>
									))
								})()}
							</div>
						</div>
					) : (
						<div className='h-full flex items-center justify-center'>
							<p className='text-gray-500'>Оберіть дату з календаря</p>
						</div>
					)}

					{selectedDate && selectedTime && (
						<div className='mt-8 max-sm:p-2'>
							<div className='mb-4 p-4 bg-gray-50 rounded-lg'>
								<p className='font-medium'>Ви обрали:</p>
								<p>
									{formatDate(selectedDate)} о {selectedTime}
								</p>
							</div>
							<a href='https://t.me/yana_vocalcoach'>
								<Button variant='primary' className='w-full'>
									Підтвердити запис
								</Button>
							</a>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default CalendarSection
