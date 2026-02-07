'use client'

import {useEffect, useState} from 'react'
import Button from '@/ui/Button'

const calendarUrl = process.env.NEXT_PUBLIC_CALENDAR_URL;

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
  const blockAllDays = false

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
          `${calendarUrl}?key=AIzaSyAKbkQxAlUHUT3jK2EFFfFzRk4LegDlUHs&` +
          `timeMin=${encodeURIComponent(firstDayOfMonth.toISOString())}&` +
          `timeMax=${encodeURIComponent(lastDayOfNextMonth.toISOString())}&` +
          `singleEvents=true&orderBy=startTime`
        );

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

				// Используем только нужные слоты
				const allSlots = generateCustomSlots(
					firstDayOfMonth,
					lastDayOfNextMonth
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

	// Функция генерации только нужных слотов по условиям задачи
	function generateCustomSlots(startDate: Date, endDate: Date) {
		const slots = []
		const currentDate = new Date(startDate)
		
		while (currentDate <= endDate) {
			const year = currentDate.getFullYear()
			const month = currentDate.getMonth() + 1
			const day = currentDate.getDate()
			const dayOfWeek = currentDate.getDay() // 0 - Sunday, 1 - Monday, ...
			const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
			
			// === Січень 2026 ===
			if (year === 2026 && month === 1) {
				// Вторник
				if (dayOfWeek === 2) {
					slots.push({ date: dateStr, time: '14:00' })
					if (day >= 13) {
						slots.push({ date: dateStr, time: '18:00' })
					}
				}
				// Среда
				if (dayOfWeek === 3) {
					slots.push({ date: dateStr, time: '13:00' })
					slots.push({ date: dateStr, time: '17:00' })
				}
				// Четверг
				if (dayOfWeek === 4) {
					slots.push({ date: dateStr, time: '18:00' })
				}
				// Пятница
				if (dayOfWeek === 5) {
					slots.push({ date: dateStr, time: '16:00' })
				}
			}

			// === Лютий 2026 ===
			if (year === 2026 && month === 2) {
				// Вівторок, середа, четверг
				if (dayOfWeek === 2 || dayOfWeek === 3 || dayOfWeek === 4) {
					if (dateStr === '2026-02-11') {
						slots.push({ date: dateStr, time: '14:00' })
					}
					slots.push({ date: dateStr, time: '13:00' })
					slots.push({ date: dateStr, time: '18:00' })
				}
				// П'ятниця
				if (dayOfWeek === 5) {
					if (dateStr === '2026-02-13' || dateStr >= '2026-02-27') {
						slots.push({ date: dateStr, time: '15:00' })
					} else {
						slots.push({ date: dateStr, time: '16:00' })
					}
				}
			}

			// === Березень 2026 ===
			if (year === 2026 && month === 3) {
				// Четвер
				if (dayOfWeek === 4) {
					slots.push({ date: dateStr, time: '13:00' })
				}
				// П'ятниця
				if (dayOfWeek === 5) {
					slots.push({ date: dateStr, time: '15:00' })
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
		if (blockAllDays) return false
		
		const date = new Date(currentYear, currentMonth, day)
		const today = new Date()
		today.setHours(0, 0, 0, 0)
		
		// === Дозволяємо січень, лютий та березень 2026 ===
		if (!(date.getFullYear() === 2026 && (date.getMonth() === 0 || date.getMonth() === 1 || date.getMonth() === 2))) {
			return false
		}
		
		if (date < today) return false
		
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const dayFormatted = String(date.getDate()).padStart(2, '0')
		const dateString = `${year}-${month}-${dayFormatted}`
		
		if (blockedDates.includes(dateString)) return false
		
		return (availableSlots[dateString] || []).length > 0
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
			<h3 className='mb-6 text-2xl font-bold text-center text-gray-900'>
				Оберіть дату та час
			</h3>

			<div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
				{/* Календарь */}
				<div>
					<div className='flex justify-between items-center mb-4'>
						<button
							onClick={prevMonth}
							className='p-2 rounded-full transition-colors hover:bg-gray-100'
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
							className='p-2 rounded-full transition-colors hover:bg-gray-100'
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
								className='text-sm font-medium text-center text-gray-500'
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
                    ${isSelected ? 'text-white bg-blue-600' : ''}
                    ${
											isAvailable
												? isSelected
													? 'text-white bg-blue-600'
													: 'text-gray-900 hover:bg-gray-100'
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
							<h4 className='mb-4 text-lg font-bold text-gray-900'>
								{formatDate(selectedDate)}
							</h4>
							<div className='grid grid-cols-2 gap-3'>
								{(availableSlots[selectedDate] || []).map(time => (
									<button
										key={time}
										onClick={() => handleTimeSelect(time)}
										className={`py-2 px-4 rounded-lg border transition-colors cursor-pointer
            ${selectedTime === time ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:bg-gray-50'}
          `}
									>
										{time}
									</button>
								))}
							</div>
						</div>
					) : (
						<div className='flex justify-center items-center h-full'>
							<p className='text-gray-500'>Оберіть дату з календаря</p>
						</div>
					)}

					{selectedDate && selectedTime && (
						<div className='mt-8 max_sm:p-2'>
							<div className='p-4 mb-4 bg-gray-50 rounded-lg'>
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
