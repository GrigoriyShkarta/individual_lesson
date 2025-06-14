'use client'

import Button from '@/ui/Button'
import { motion } from 'framer-motion'
import ShapesDecorations from './ShapesDecorations'

const HeroSection = () => {
	return (
		<section className='relative py-20 md:py-32 overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white'>
			<div className='absolute top-0 left-0 w-full h-full opacity-20'>
				<ShapesDecorations />
			</div>

			<div className='container mx-auto px-4 relative z-10'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='max-w-3xl mx-auto text-center'
				>
					<h1 className='text-4xl md:text-6xl font-bold mb-6'>
						Індивідуальні онлайн-уроки{' '}
						<span className='text-blue-400'>
							сучасного, рок та екстремального вокалу
						</span>
					</h1>
					<p className='text-xl md:text-2xl mb-8 text-gray-300'>
						Розкрий свій потенціал з професійним викладачем Міжнародного рівня
					</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center'>
						<Button
							variant='primary'
							onClick={() => {
								const pricingSection = document.getElementById('pricing')
								if (pricingSection) {
									pricingSection.scrollIntoView({
										behavior: 'smooth',
									})
								}
							}}
						>
							Записатися на урок
						</Button>
						<Button
							variant='secondary'
							onClick={() => {
								const pricingSection = document.getElementById('about')
								if (pricingSection) {
									pricingSection.scrollIntoView({
										behavior: 'smooth',
									})
								}
							}}
						>
							Дізнатися більше
						</Button>
					</div>
				</motion.div>
			</div>
		</section>
	)
}

export default HeroSection
