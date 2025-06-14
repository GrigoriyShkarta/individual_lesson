'use client'

import { motion } from 'framer-motion'

const approaches = [
	{
		title: 'Індивідуальний підхід',
		description:
			'Кожен унікальний, тому програма навчання розробляється під ваш голос, цілі та можливості.',
		icon: '👤',
	},
	{
		title: 'Комплексна робота',
		description:
			'Ми працюємо не лише над технікою, а й над стилістикою, артистизмом, сценічною майстерністю та впевненістю.',
		icon: '🎯',
	},
	{
		title: 'Сучасні методики та науковий підхід',
		description:
			'Використовую сучасні світові методики навчання вокалу, які ґрунтуються на наукових дослідженнях голосу. Жодних міфів, тільки перевірена і достовірна інформація.',
		icon: '📚',
	},
	{
		title: 'Безпека голосу',
		description:
			"Бережно ставлюся до вашого голосу, приділяю велику увагу його здоров'ю та надаю ефективні фонопедичні вправи для відпочинку та відновлення.",
		icon: '🛡️',
	},
	{
		title: 'Затишна та позитивна атмосфера',
		description:
			'Уроки проходять в творчій та дружній атмосфері, де кожен студент почувається в безпеці, без страху робити спроби та помилки.',
		icon: '🤗',
	},
]

const ApproachSection = () => {
	return (
		<section id={'approach'} className='py-20 bg-gray-50'>
			<div className='container mx-auto px-4'>
				<h2 className='text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900'>
					Мій підхід до навчання
				</h2>

				<div className='grid md:grid-cols-2 lg:grid-cols-5 gap-8'>
					{approaches.map((approach, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className='bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow'
						>
							<div className='text-4xl mb-4'>{approach.icon}</div>
							<h3 className='text-xl font-bold mb-3 text-gray-900'>
								{approach.title}
							</h3>
							<p className='text-gray-700'>{approach.description}</p>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	)
}

export default ApproachSection
