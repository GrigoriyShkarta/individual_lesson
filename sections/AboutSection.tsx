'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const AboutSection = () => {
	return (
		<section id={'about'} className='py-20 bg-white'>
			<div className='container mx-auto px-4'>
				<div className='flex flex-col lg:flex-row items-center gap-12 justify-center'>
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className='w-full lg:w-1/3'
					>
						<div className='relative rounded-2xl overflow-hidden aspect-square w-full'>
							<Image
								src='/assets/ys_vocalcoach.png'
								alt='Викладач вокалу'
								fill
								sizes='(max-width: 200px) 100vw, 50vw'
								className='object-cover'
							/>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 50 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className='lg:w-1/2'
					>
						<h2 className='text-3xl md:text-4xl font-bold mb-6 text-gray-900'>
							Про мене
						</h2>
						<p className='text-lg text-gray-700 mb-4'>
							Мене звати Яна, і я професійний викладач сучасного, рок та
							екстремального вокалу з 8-річним досвідом.
						</p>
						<p className='text-lg text-gray-700 mb-4'>
							Я спеціалізуюсь на індивідуальному підході до кожного учня,
							допомагаю розкрити унікальність голосу, освоїти сучасні та
							екстремальні вокальні техніки та досягти професійного рівня.
						</p>
						<p className='text-lg text-gray-700 mb-6'>
							Мої учні виступають на великих сценах, записують власні пісні,
							перемагають у вокальних конкурсах та отримують задоволення від
							свого вокалу.
						</p>
						{/* <ul className='space-y-2'>
							<li className='flex items-center'>
								<span className='mr-2 text-blue-500'>✓</span>
								<span>Вища музична освіта</span>
							</li>
							<li className='flex items-center'>
								<span className='mr-2 text-blue-500'>✓</span>
								<span>Сертифікати міжнародних вокальних шкіл</span>
							</li>
							<li className='flex items-center'>
								<span className='mr-2 text-blue-500'>✓</span>
								<span>Досвід виступів на великих сценах</span>
							</li>
						</ul> */}
					</motion.div>
				</div>
			</div>
		</section>
	)
}

export default AboutSection
