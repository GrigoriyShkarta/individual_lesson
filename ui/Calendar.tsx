'use client'

import { useEffect, useState } from 'react'
import Button from '@/ui/Button'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/uk' 

// Initialize dayjs with plugins
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('uk')

const KYIV_TZ = 'Europe/Kyiv'
const calendarUrl = process.env.NEXT_PUBLIC_CALENDAR_URL;

const CalendarSection = () => {
	const initialTime = dayjs().tz(KYIV_TZ)
	const [selectedDate, setSelectedDate] = useState<string | null>(null)
	const [selectedTime, setSelectedTime] = useState<string | null>(null)
	const [currentMonth, setCurrentMonth] = useState(initialTime.month())
	const [currentYear, setCurrentYear] = useState(initialTime.year())
	const [availableSlots, setAvailableSlots] = useState<
		Record<string, string[]>
	>({})

	// Массив заблокированных дат (в формате 'YYYY-MM-DD')
	const blockedDates = ['2025-06-27']
  const blockAllDays = false

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const now = dayjs().tz(KYIV_TZ)
				const firstDayOfMonth = now.startOf('month')
				const lastDayOfFuture = now.add(1, 'month').endOf('month')
				
				const response = await fetch(
					`${calendarUrl}?key=AIzaSyAKbkQxAlUHUT3jK2EFFfFzRk4LegDlUHs&` +
					`timeMin=${encodeURIComponent(firstDayOfMonth.toISOString())}&` +
					`timeMax=${encodeURIComponent(lastDayOfFuture.toISOString())}&` +
					`singleEvents=true&orderBy=startTime`
				);

				const data = await response.json()

				// Получаем все занятые периоды
				const busyPeriods = (data.items || [])
					.filter((event: any) => 
						event.status !== 'cancelled' && 
						event.transparency !== 'transparent' // Ігноруємо події, що позначені як "Вільний"
					)
					.map((event: any) => {
						const startStr = event.start?.dateTime || event.start?.date
						const endStr = event.end?.dateTime || event.end?.date
						
						return {
							start: dayjs(startStr).tz(KYIV_TZ),
							end: dayjs(endStr).tz(KYIV_TZ),
						}
					})

				// Используем только нужные слоты
				const allSlots = generateCustomSlots(
					firstDayOfMonth,
					lastDayOfFuture
				)

				// Фильтруем свободные слоты
				const freeSlots = allSlots.filter(slot => {
					const slotStart = dayjs.tz(`${slot.date} ${slot.time}`, KYIV_TZ)
					const slotEnd = slotStart.add(60, 'minute')

					return !busyPeriods.some(
						(busy: { start: dayjs.Dayjs; end: dayjs.Dayjs }) =>
							slotStart.isBefore(busy.end) && slotEnd.isAfter(busy.start)
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
	function generateCustomSlots(startDate: dayjs.Dayjs, endDate: dayjs.Dayjs) {
		const slots = []
		let currentDate = startDate.startOf('day')
		
		while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
			const year = currentDate.year()
			const month = currentDate.month() + 1
			const dayOfWeek = currentDate.day() // 0 - Sunday, 1 - Monday, ...
			const dateStr = currentDate.format('YYYY-MM-DD')

			// === Березень 2026 ===
			if (year === 2026 && month >= 4) {
				
				if (dayOfWeek === 3) {
					slots.push({ date: dateStr, time: '15:00' })
				}
				// Четвер
				if (dayOfWeek === 4) {
					slots.push({ date: dateStr, time: '16:00' })
				}
				// П'ятниця
				if (dayOfWeek === 5) {
					slots.push({ date: dateStr, time: '15:00' })
				}
			}

			if (year === 2026 && month >= 5) {
				if (dayOfWeek === 2) {
					slots.push({ date: dateStr, time: '14:00' })
				}
				if (dayOfWeek === 3) {
					slots.push({ date: dateStr, time: '14:00' })
				}
				if (dayOfWeek === 4) {
					// slots.push({ date: dateStr, time: '16:00' })
				}
			}
			
			currentDate = currentDate.add(1, 'day')
		}
		
		return slots
	}
	
	// Генерация дней месяца
	const currentVisibleMonth = dayjs.tz(`${currentYear}-${currentMonth + 1}-01`, KYIV_TZ)
	const daysInMonth = currentVisibleMonth.daysInMonth()
	const firstDayOfMonth = currentVisibleMonth.day()
	const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

	const isPrevMonthDisabled = dayjs.tz(`${currentYear}-${currentMonth + 1}-01`, KYIV_TZ)
		.isSame(dayjs().tz(KYIV_TZ).startOf('month'), 'month')
	const isNextMonthDisabled = dayjs.tz(`${currentYear}-${currentMonth + 1}-01`, KYIV_TZ)
		.isSame(dayjs().tz(KYIV_TZ).add(1, 'month').startOf('month'), 'month')

	// Переключение месяцев
	const prevMonth = () => {
		if (isPrevMonthDisabled) return

		if (currentMonth === 0) {
			setCurrentMonth(11)
			setCurrentYear(currentYear - 1)
		} else {
			setCurrentMonth(currentMonth - 1)
		}
	}

	const nextMonth = () => {
		if (isNextMonthDisabled) return

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
		
		const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
		const date = dayjs.tz(dateString, KYIV_TZ).startOf('day')
		const today = dayjs().tz(KYIV_TZ).startOf('day')
		
		// === Дозволяємо з січня 2026 року ===
		if (!(date.year() === 2026 && date.month() >= 0)) {
			return false
		}
		
		if (date.isBefore(today)) return false
		
		const year = date.year()
		const month = String(date.month() + 1).padStart(2, '0')
		const dayFormatted = String(date.date()).padStart(2, '0')
		const dateStringFromDate = `${year}-${month}-${dayFormatted}`
		
		if (blockedDates.includes(dateStringFromDate)) return false
		
		return (availableSlots[dateStringFromDate] || []).length > 0
	}
	
	
	// Обработчик выбора даты
	const handleDateSelect = (day: number) => {
		const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

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
		return dayjs.tz(dateString, KYIV_TZ).format('dddd, D MMMM')
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
							disabled={isPrevMonthDisabled}
							className={`p-2 rounded-full transition-colors ${
								isPrevMonthDisabled 
									? 'text-gray-300 cursor-not-allowed' 
									: 'text-gray-600 hover:bg-gray-100'
							}`}
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
							{dayjs.tz(`${currentYear}-${currentMonth + 1}-01`, KYIV_TZ).format('MMMM YYYY')}
						</h4>
						<button
							onClick={nextMonth}
							disabled={isNextMonthDisabled}
							className={`p-2 rounded-full transition-colors ${
								isNextMonthDisabled 
									? 'text-gray-300 cursor-not-allowed' 
									: 'text-gray-600 hover:bg-gray-100'
							}`}
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
