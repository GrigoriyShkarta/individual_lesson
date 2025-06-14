'use client'

import Button from '@/ui/Button'
import { motion } from 'framer-motion'

const CtaSection = () => {
	return (
		<section className='py-20 bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 text-white'>
			<div className='container mx-auto px-4 text-center'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8 }}
				>
					<h2 className='text-3xl md:text-4xl font-bold mb-6'>
						Готові розпочати свою вокальну подорож?
					</h2>
					<p className='text-xl mb-8 max-w-2xl mx-auto opacity-90'>
						Запишіться на пробний урок вже сьогодні та отримайте детальний
						аналіз вашого голосу!
					</p>
					<Button
						variant='white'
						size='lg'
						onClick={() => {
							const pricingSection = document.getElementById('pricing')
							if (pricingSection) {
								pricingSection.scrollIntoView({
									behavior: 'smooth',
								})
							}
						}}
						className='shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all'
					>
						Записатися на урок
					</Button>
				</motion.div>
			</div>
		</section>
	)
}

export default CtaSection
