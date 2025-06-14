'use client'

import Button from '@/ui/Button'
import Calendar from '@/ui/Calendar'

const PricingSection = () => {
	// Выносим тарифы в отдельный массив для удобства
	const pricingPlans = [
		{
			id: 2,
			title: '4 уроки',
			description: '1 раз на тиждень',
			price: '4000 грн',
			popular: true,
			variant: 'outline' as const,
		},
		{
			id: 3,
			title: '6 уроків',
			description: 'Чергуємо 1 та 2 рази на тиждень',
			price: '6000 грн',
			popular: false,
			variant: 'primary' as const,
		},
		{
			id: 4,
			title: '8 уроків',
			description: '2 рази на тиждень',
			price: '8000 грн',
			popular: true,
			variant: 'outline' as const,
		},
		{
			id: 5,
			title: '12 уроків',
			description: 'Інтенсивний курс (3 рази на тиждень)',
			price: '12000 грн',
			popular: false,
			variant: 'outline' as const,
		},
	]

	return (
		<section id={'pricing'} className='py-20 bg-gray-50'>
			<div className='container mx-auto px-4'>
				<h2 className='text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900'>
					Варіанти навчання
				</h2>

				<div className='max-w-4xl mx-auto'>
					<div className='bg-white rounded-xl shadow-lg overflow-hidden mb-12'>
						<div className='p-8'>
							<h3 className='text-2xl font-bold mb-4 text-blue-600'>
								Пробний урок
							</h3>
							<p className='text-gray-700 mb-6'>
								Ознайомчий урок тривалістю 45 хвилин, де ми познайомимось, я
								розповім детальніше про свій підхід, визначу ваш рівень та
								обговоримо подальшу програму навчання згідно вашим запитам.
							</p>
							<div className='flex flex-col sm:flex-row justify-between items-center'>
								<span className='text-3xl font-bold text-gray-900 mb-4 sm:mb-0'>
									700 грн
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
					<h3 className='text-2xl font-bold mb-4 text-blue-600 text-center'>
						Абонименти
					</h3>
					<div className='grid md:grid-cols-2 gap-6 mb-6'>
						{pricingPlans.map(plan => (
							<div
								key={plan.id}
								className={`bg-white rounded-xl shadow-lg overflow-hidden relative ${
									plan.popular ? 'border-2 border-blue-500' : ''
								}`}
							>
								{plan.popular && (
									<div className='absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-sm font-bold rounded-bl-lg'>
										Популярний
									</div>
								)}
								<div className='p-6'>
									<h3 className='text-xl font-bold mb-4 text-gray-900'>
										{plan.title}
									</h3>
									<p className='text-gray-700 mb-4'>{plan.description}</p>
									<p className='text-2xl font-bold mb-6 text-blue-600'>
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
					<p className='text-center font-bold mb-6'>
						Тривалість уроку в абонементі 50 хвилин
					</p>

					{/* Разовый урок */}
					<div className='bg-white rounded-xl shadow-lg overflow-hidden mb-12'>
						<div className='p-8'>
							<h3 className='text-2xl font-bold mb-4 text-blue-600'>
								Разовий урок
							</h3>
							<p className='text-gray-700 mb-6'>
								Індивідуальне заняття для тих, хто хоче отримати одноразову
								консультацію або покращити конкретний аспект свого вокалу.
								Тривалість - 55 хвилин. Ідеально підходить для тих, хто хоче
								отримати відповіді на свої питання та отримати програму для
								самостійних занять.
							</p>
							<div className='flex flex-col sm:flex-row justify-between items-center'>
								<span className='text-3xl font-bold text-gray-900 mb-4 sm:mb-0'>
									1500 грн
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

					{/* Календарь */}
					<div className='bg-white rounded-xl shadow-lg overflow-hidden p-6'>
						<h3 className='text-2xl font-bold mb-6 text-center text-gray-900'>
							Доступні дати для запису
						</h3>
						<div className='flex justify-center'>
							<Calendar />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default PricingSection
