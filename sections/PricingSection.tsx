'use client'

import Button from '@/ui/Button'
// import Calendar from "@/ui/Calendar";

const PricingSection = () => {
	// Выносим тарифы в отдельный массив для удобства
	const pricingPlans = [
		{
			id: 2,
			title: '4 уроки',
			description: '1 раз на тиждень',
			price: '6000 грн',
			popular: true,
			variant: 'outline' as const,
		},
		// {
		// 	id: 3,
		// 	title: '6 уроків',
		// 	description: 'Чергуємо 1 та 2 рази на тиждень',
		// 	price: '6000 грн',
		// 	popular: false,
		// 	variant: 'primary' as const,
		// },
		{
			id: 4,
			title: '8 уроків',
			description: '2 рази на тиждень',
			price: '12000 грн',
			popular: true,
			variant: 'outline' as const,
		},
		{
			id: 5,
			title: '12 уроків',
			description: 'Інтенсивний курс (3 рази на тиждень)',
			price: '18000 грн',
			popular: false,
			variant: 'outline' as const,
		},
	]

	return (
		<section id={'pricing'} className='py-20 bg-gray-50'>
			<div className='container px-4 mx-auto'>
				<h2 className='mb-12 text-3xl font-bold text-center text-gray-900 md:text-4xl'>
					Варіанти навчання
				</h2>

				<div className='mx-auto max-w-4xl'>
					<div className='overflow-hidden mb-12 bg-white rounded-xl shadow-lg'>
						<div className='p-8'>
							<h3 className='mb-4 text-2xl font-bold text-blue-600'>
								Пробний урок
							</h3>
							<p className='mb-6 text-gray-700'>
								Ознайомчий урок тривалістю 45 хвилин, де ми познайомимось, я
								розповім детальніше про свій підхід, визначу ваш рівень та
								обговоримо подальшу програму навчання згідно вашим запитам.
							</p>
							<div className='flex flex-col justify-between items-center sm:flex-row'>
								<span className='mb-4 text-3xl font-bold text-gray-900 sm:mb-0'>
									1250 грн
								</span>
								<Button
									variant='outline'
									onClick={() => {
										const pricingSection = document.getElementById('buy')
										if (pricingSection) {
											pricingSection.scrollIntoView({
												behavior: 'smooth',
											})
										}
									}}
								>
									Записатися
								</Button>
							</div>
						</div>
					</div>
					{/* Основные тарифы */}
					<h3 className='mb-4 text-2xl font-bold text-center text-blue-600'>
						Абонименти
					</h3>
					<div className='grid gap-6 mb-6'>
						{pricingPlans.map(plan => (
							<div
								key={plan.id}
								className={`bg-white rounded-xl shadow-lg overflow-hidden relative ${
									plan.popular ? 'border-2 border-blue-500' : ''
								}`}
							>
								{plan.popular && (
									<div className='absolute top-0 right-0 px-3 py-1 text-sm font-bold text-white bg-blue-500 rounded-bl-lg'>
										Популярний
									</div>
								)}
								<div className='p-6'>
									<h3 className='mb-4 text-xl font-bold text-gray-900'>
										{plan.title}
									</h3>
									<p className='mb-4 text-gray-700'>{plan.description}</p>
									<p className='mb-6 text-2xl font-bold text-blue-600'>
										{plan.price}
									</p>
									<Button
										variant={plan.variant}
										onClick={() => {
											const pricingSection = document.getElementById('buy')
											if (pricingSection) {
												pricingSection.scrollIntoView({
													behavior: 'smooth',
												})
											}
										}}
									>
										Обрати
									</Button>
								</div>
							</div>
						))}
					</div>
					<p className='mb-6 font-bold text-center'>
						Тривалість уроку в абонементі 50 хвилин
					</p>

					{/* Разовый урок */}
					<div className='overflow-hidden mb-12 bg-white rounded-xl shadow-lg'>
						<div className='p-8'>
							<h3 className='mb-4 text-2xl font-bold text-blue-600'>
								Разовий урок
							</h3>
							<p className='mb-6 text-gray-700'>
								Індивідуальне заняття для тих, хто хоче отримати одноразову
								консультацію або покращити конкретний аспект свого вокалу.
								Тривалість - 55 хвилин. Ідеально підходить для тих, хто хоче
								отримати відповіді на свої питання та програму для самостійних
								занять.
							</p>
							<div className='flex flex-col justify-between items-center sm:flex-row'>
								<span className='mb-4 text-3xl font-bold text-gray-900 sm:mb-0'>
									2500 грн
								</span>
								<Button
									variant='outline'
									onClick={() => {
										const pricingSection = document.getElementById('buy')
										if (pricingSection) {
											pricingSection.scrollIntoView({
												behavior: 'smooth',
											})
										}
									}}
								>
									Записатися
								</Button>
							</div>
						</div>
					</div>
					{/* Інформаційний блок про відпустку та запис через Telegram */}
					<div
						id='buy'
						className='overflow-hidden relative p-8 mx-auto my-8 max-w-3xl text-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 rounded-2xl border shadow-xl md:p-10 border-blue-100/80'
					>
						{/* Декоративне сяйво на фоні */}
						<div className='absolute -top-12 -right-12 w-48 h-48 rounded-full blur-2xl pointer-events-none bg-blue-200/40' />
						<div className='absolute -bottom-12 -left-12 w-48 h-48 rounded-full blur-2xl pointer-events-none bg-indigo-200/40' />

						<div className='flex relative z-10 flex-col items-center'>
							<div className='inline-flex items-center justify-center p-3.5 mb-5 text-blue-600 rounded-full bg-blue-100/80 shadow-inner'>
								<svg
									className='w-8 h-8'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
									/>
								</svg>
							</div>

							<span className='inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-wide text-blue-700 uppercase bg-blue-100 rounded-full'>
								Інформація про запис
							</span>

							<h3 className='mb-3 text-2xl font-bold text-gray-900 md:text-3xl'>
								З 03.07.2026 перебуваю у відпустці ☀️
							</h3>

							<p className='mb-8 max-w-xl text-lg leading-relaxed text-gray-600'>
								Для запису в лист очікування на індивідуальні уроки пишіть у Telegram.
							</p>

							<a
								href='https://t.me/yana_vocalcoach'
								target='_blank'
								rel='noopener noreferrer'
								className='inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-medium text-white transition-all duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 transform hover:-translate-y-0.5 group'
							>
								<svg className='w-6 h-6 fill-current' viewBox='0 0 24 24'>
									<path d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.962 4.084-1.362 5.761-.17.712-.433.951-.687.974-.555.051-.977-.367-1.514-.719-.84-.551-1.314-.894-2.128-1.43-.941-.62-.331-.961.205-1.519.14-.146 2.576-2.361 2.624-2.565.006-.026.011-.123-.047-.175s-.144-.034-.206-.02c-.088.02-1.488.946-4.201 2.777-.397.272-.757.406-1.079.399-.356-.008-1.04-.202-1.549-.367-.625-.203-1.123-.311-1.079-.656.023-.179.274-.363.753-.552 2.951-1.285 4.92-2.133 5.908-2.544 2.822-1.173 3.408-1.377 3.791-1.384.084 0 .272.021.394.12.103.084.132.198.146.279.014.081.026.264.013.411z' />
								</svg>
								<span>Написати в Telegram</span>
								<svg
									className='w-5 h-5 transition-transform group-hover:translate-x-1'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M14 5l7 7m0 0l-7 7m7-7H3'
									/>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default PricingSection
