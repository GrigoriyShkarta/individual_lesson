'use client'

import Button from '@/ui/Button'
import Calendar from "@/ui/Calendar";

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

					{/* Календарь */}
					<div className='overflow-hidden p-6 bg-white rounded-xl shadow-lg'>
						<h3 className='mb-6 text-2xl font-bold text-center text-gray-900'>
							Доступні дати для запису
						</h3>
						<div className='flex justify-center'>
							<Calendar />
						</div>
					</div>
          
          <div
            id={'buy'}
            className='overflow-hidden relative bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-2xl shadow-xl'
          >
            {/* Декоровані кола на фоні */}
            {/*<div className='absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl pointer-events-none bg-blue-200/30' />*/}
            {/*<div className='absolute -bottom-16 -left-16 w-56 h-56 rounded-full blur-3xl pointer-events-none bg-indigo-200/30' />*/}
            
            {/*<div className='relative p-6 sm:p-8'>*/}
            {/*  <div className='flex gap-2 justify-center items-center mb-5'>*/}
      {/*<span className='inline-flex gap-2 items-center px-3 py-1 text-xs font-semibold text-blue-700 rounded-full ring-1 ring-inset bg-blue-600/10 ring-blue-600/20'>*/}
      {/*  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' className='text-blue-600'>*/}
      {/*    <path d='M12 3v18m9-9H3' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>*/}
      {/*  </svg>*/}
      {/*  Набір обмежений*/}
      {/*</span>*/}
      {/*        </div>*/}
              
              <div className='flex flex-col gap-2 md:flex-row'>
              
              {/* Колонка — Очікування індивідуальних */}
              {/*  <div className='flex flex-col justify-between p-5 rounded-xl border border-gray-200 shadow-sm backdrop-blur-sm transition-shadow bg-white/80 sm:p-6 hover:shadow-md'>*/}
              {/*    <div className='flex gap-3 items-start'>*/}
              {/*      <div className='mt-1 text-blue-600 shrink-0'>*/}
              {/*        <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>*/}
              {/*          <path d='M12 2a10 10 0 100 20 10 10 0 000-20Zm0 6v5l3 1' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>*/}
              {/*        </svg>*/}
              {/*      </div>*/}
              {/*      <div>*/}
              {/*        <h4 className='text-lg font-bold text-gray-900'>*/}
              {/*          Індивідуальні уроки*/}
              {/*        </h4>*/}
              {/*        <p className='mt-2 text-gray-700'>*/}
              {/*          Наявність вільних місць і зручних віконець узгоджуйте індивідуально.                      </p>*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*    */}
              {/*    <div className='flex justify-center mt-4'>*/}
              {/*      <a href='https://t.me/yana_vocalcoach' className='w-full sm:w-auto'>*/}
              {/*        <Button*/}
              {/*          variant='primary'*/}
              {/*          as='button'*/}
              {/*          size='sm'*/}
              {/*          className='w-full sm:w-auto group'*/}
              {/*          onClick={() => {*/}
              {/*            const pricingSection = document.getElementById('pricing')*/}
              {/*            if (pricingSection) {*/}
              {/*              pricingSection.scrollIntoView({ behavior: 'smooth' })*/}
              {/*            }*/}
              {/*          }}*/}
              {/*        >*/}
              {/*          <span className='inline-flex gap-2 items-center'>*/}
              {/*            Написати*/}
              {/*            <svg*/}
              {/*              className='w-4 h-4 transition-transform group-hover:translate-x-0.5'*/}
              {/*              viewBox='0 0 24 24'*/}
              {/*              fill='none'*/}
              {/*            >*/}
              {/*              <path d='M5 12h14M13 5l7 7-7 7' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>*/}
              {/*            </svg>*/}
              {/*          </span>*/}
              {/*        </Button>*/}
              {/*      </a>*/}
              {/*    </div>*/}
              {/*  </div>*/}
                
                {/* Вертикальний поділ на md */}
                {/*<div className='hidden mx-auto w-px h-full bg-gradient-to-b from-transparent via-gray-200 to-transparent md:block' aria-hidden='true' />*/}
                
                {/* Колонка — Мінігрупа */}
                {/*<div className='flex flex-col justify-between p-5 rounded-xl border border-gray-200 shadow-sm backdrop-blur-sm transition-shadow bg-white/80 sm:p-6 hover:shadow-md'>*/}
                {/*  <div className='flex gap-3 items-start'>*/}
                {/*    <div className='mt-1 text-indigo-600 shrink-0'>*/}
                {/*      <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>*/}
                {/*        <path d='M8 17a4 4 0 118 0v1H8v-1Z' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>*/}
                {/*        <circle cx='12' cy='8' r='3' stroke='currentColor' strokeWidth='2'/>*/}
                {/*      </svg>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*      <div className='flex gap-2 items-center'>*/}
                {/*        <h4 className='text-lg font-bold text-gray-900'>*/}
                {/*          Мінігрупа: екстремальні техніки з нуля*/}
                {/*        </h4>*/}
                {/*        */}
                {/*      </div>*/}
                {/*      <p className='mt-2 text-gray-700'>*/}
                {/*        А поки триває набір у мінігрупу на курс з екстремальних технік вокалу з нуля. Почніть навчання вже зараз!                      </p>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                  
                  {/*<div className='flex justify-center mt-4'>*/}
                  {/*  <a href='https://extreme-group-sable.vercel.app/' className='w-full sm:w-auto'>*/}
                  {/*    <Button*/}
                  {/*      variant='outline'*/}
                  {/*      as='button'*/}
                  {/*      size='sm'*/}
                  {/*      className='w-full sm:w-auto group'*/}
                  {/*      onClick={() => {*/}
                  {/*        const pricingSection = document.getElementById('pricing')*/}
                  {/*        if (pricingSection) {*/}
                  {/*          pricingSection.scrollIntoView({ behavior: 'smooth' })*/}
                  {/*        }*/}
                  {/*      }}*/}
                  {/*    >*/}
                  {/*      <span className='inline-flex gap-2 items-center'>*/}
                  {/*        На курс*/}
                  {/*        <svg*/}
                  {/*          className='w-4 h-4 transition-transform group-hover:translate-x-0.5'*/}
                  {/*          viewBox='0 0 24 24'*/}
                  {/*          fill='none'*/}
                  {/*        >*/}
                  {/*          <path d='M5 12h14M13 5l7 7-7 7' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>*/}
                  {/*        </svg>*/}
                  {/*      </span>*/}
                  {/*    </Button>*/}
                  {/*  </a>*/}
                  {/*</div>*/}
                {/*</div>*/}
              </div>
              
            {/*</div>*/}
          </div>
        
        </div>
			</div>
		</section>
	)
}

export default PricingSection
