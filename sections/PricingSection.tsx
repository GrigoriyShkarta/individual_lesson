'use client'

import Button from '@/ui/Button'

const PricingSection = () => {
	// Выносим тарифы в отдельный массив для удобства
	const pricingPlans = [
		{
			id: 2,
			title: '4 уроки',
			description: '1 раз на тиждень',
			price: '5000 грн',
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
			price: '10000 грн',
			popular: true,
			variant: 'outline' as const,
		},
		{
			id: 5,
			title: '12 уроків',
			description: 'Інтенсивний курс (3 рази на тиждень)',
			price: '15000 грн',
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
									1000 грн
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
					<div className='grid gap-6 mb-6'>
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
								отримати відповіді на свої питання та програму для самостійних
								занять.
							</p>
							<div className='flex flex-col sm:flex-row justify-between items-center'>
								<span className='text-3xl font-bold text-gray-900 mb-4 sm:mb-0'>
									2000 грн
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
					{/*<div className='bg-white rounded-xl shadow-lg overflow-hidden p-6'>*/}
					{/*	<h3 className='text-2xl font-bold mb-6 text-center text-gray-900'>*/}
					{/*		Доступні дати для запису*/}
					{/*	</h3>*/}
					{/*	<div className='flex justify-center'>*/}
					{/*		<Calendar />*/}
					{/*	</div>*/}
					{/*</div>*/}
          
          {/*<div id={'buy'} className='bg-white rounded-xl shadow-lg overflow-hidden p-6'>*/}
          {/*  <p className='text-center font-semibold'>Наразі місць на постійні індивідуальні уроки немає. Ви можете записатися у лист очікування – я зв’яжусь з вами, як тільки з’явиться вільний час.</p>*/}
          {/*  */}
          {/*  <div className='flex justify-center mt-4'>*/}
          {/*    <a href='https://t.me/yana_vocalcoach'>*/}
          {/*    <Button*/}
          {/*      variant='primary'*/}
          {/*      as='button'*/}
          {/*      size='sm'*/}
          {/*      onClick={() => {*/}
          {/*        const pricingSection = document.getElementById('pricing')*/}
          {/*        if (pricingSection) {*/}
          {/*          pricingSection.scrollIntoView({*/}
          {/*            behavior: 'smooth',*/}
          {/*          })*/}
          {/*        }*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      Записатися*/}
          {/*    </Button>*/}
          {/*    </a>*/}
          {/*  </div>*/}
          {/*  */}
          {/*  <p className='text-center font-semibold mt-4'>А поки триває набір у мінігрупу на курс з екстремальних технік вокалу з нуля. Почніть навчання вже зараз!</p>*/}
          {/*  */}
          {/*  <div className='flex justify-center mt-4'>*/}
          {/*    <a href='https://extreme-group-sable.vercel.app/'>*/}
          {/*      <Button*/}
          {/*        variant='primary'*/}
          {/*        as='button'*/}
          {/*        size='sm'*/}
          {/*        onClick={() => {*/}
          {/*          const pricingSection = document.getElementById('pricing')*/}
          {/*          if (pricingSection) {*/}
          {/*            pricingSection.scrollIntoView({*/}
          {/*              behavior: 'smooth',*/}
          {/*            })*/}
          {/*          }*/}
          {/*        }}*/}
          {/*      >*/}
          {/*        На курс*/}
          {/*      </Button>*/}
          {/*    </a>*/}
          {/*  </div>*/}
          {/*  */}
          {/*</div>*/}
          
          <div
            id={'buy'}
            className='relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-white to-blue-50 shadow-xl'
          >
            {/* Декоровані кола на фоні */}
            <div className='pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-blue-200/30 blur-3xl' />
            <div className='pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-indigo-200/30 blur-3xl' />
            
            <div className='relative p-6 sm:p-8'>
              <div className='flex items-center justify-center gap-2 mb-5'>
      {/*<span className='inline-flex items-center gap-2 rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-inset ring-blue-600/20'>*/}
      {/*  <svg width='16' height='16' viewBox='0 0 24 24' fill='none' className='text-blue-600'>*/}
      {/*    <path d='M12 3v18m9-9H3' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>*/}
      {/*  </svg>*/}
      {/*  Набір обмежений*/}
      {/*</span>*/}
              </div>
              
              <div className='flex flex-col md:flex-row gap-2'>
              
              {/* Колонка — Очікування індивідуальних */}
                <div className='flex flex-col justify-between bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow'>
                  <div className='flex items-start gap-3'>
                    <div className='shrink-0 mt-1 text-blue-600'>
                      <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                        <path d='M12 2a10 10 0 100 20 10 10 0 000-20Zm0 6v5l3 1' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                      </svg>
                    </div>
                    <div>
                      <h4 className='text-lg font-bold text-gray-900'>
                        Індивідуальні уроки
                      </h4>
                      <p className='mt-2 text-gray-700'>
                        Наявність вільних місць і зручних віконець узгоджуйте індивідуально.                      </p>
                    </div>
                  </div>
                  
                  <div className='mt-4 flex justify-center'>
                    <a href='https://t.me/yana_vocalcoach' className='w-full sm:w-auto'>
                      <Button
                        variant='primary'
                        as='button'
                        size='sm'
                        className='w-full sm:w-auto group'
                        onClick={() => {
                          const pricingSection = document.getElementById('pricing')
                          if (pricingSection) {
                            pricingSection.scrollIntoView({ behavior: 'smooth' })
                          }
                        }}
                      >
                        <span className='inline-flex items-center gap-2'>
                          Написати
                          <svg
                            className='w-4 h-4 transition-transform group-hover:translate-x-0.5'
                            viewBox='0 0 24 24'
                            fill='none'
                          >
                            <path d='M5 12h14M13 5l7 7-7 7' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                          </svg>
                        </span>
                      </Button>
                    </a>
                  </div>
                </div>
                
                {/* Вертикальний поділ на md */}
                {/*<div className='hidden md:block h-full w-px mx-auto bg-gradient-to-b from-transparent via-gray-200 to-transparent' aria-hidden='true' />*/}
                
                {/* Колонка — Мінігрупа */}
                {/*<div className='flex flex-col justify-between bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow'>*/}
                {/*  <div className='flex items-start gap-3'>*/}
                {/*    <div className='shrink-0 mt-1 text-indigo-600'>*/}
                {/*      <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>*/}
                {/*        <path d='M8 17a4 4 0 118 0v1H8v-1Z' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>*/}
                {/*        <circle cx='12' cy='8' r='3' stroke='currentColor' strokeWidth='2'/>*/}
                {/*      </svg>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*      <div className='flex items-center gap-2'>*/}
                {/*        <h4 className='text-lg font-bold text-gray-900'>*/}
                {/*          Мінігрупа: екстремальні техніки з нуля*/}
                {/*        </h4>*/}
                {/*        */}
                {/*      </div>*/}
                {/*      <p className='mt-2 text-gray-700'>*/}
                {/*        А поки триває набір у мінігрупу на курс з екстремальних технік вокалу з нуля. Почніть навчання вже зараз!                      </p>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                  
                  {/*<div className='mt-4 flex justify-center'>*/}
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
                  {/*      <span className='inline-flex items-center gap-2'>*/}
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
              
            </div>
          </div>
        
        </div>
			</div>
		</section>
	)
}

export default PricingSection
