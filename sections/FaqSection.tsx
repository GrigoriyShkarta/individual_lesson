'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const faqs = [
	{
		question: 'З якого віку можна навчатися?',
		answer:
			'Я працюю з дорослими та деколи з підлітками за умовою їхньої готовності до роботи, враховуючи особливості мутаційного періоду.',
	},
	{
		question: 'Скільки часу потрібно, щоб почути результати?',
		answer:
			'На це питання неможливо дати чітку відповідь, оскільки результати залежать від кількох факторів: складності запиту, готовності апарату учня до цього, його вокальних звичок і рівня самостійної роботи вдома. Важливими аспектами є регулярність практики та старанність. В загальному, перші помітні результати можна побачити вже після декількох уроків, але для досягнення стабільного прогресу необхідна постійна робота.',
	},
	{
		question: 'Чи можна навчитися співати, якщо немає слуху?',
		answer:
			"Слух можна розвинути. У більшості випадків 'відсутність слуху' - це просто недорозвинений музичний слух, який можна тренувати.",
	},
	{
		question: 'Що потрібно для заняття онлайн?',
		answer:
			"Для якісного онлайн-заняття з вашої сторони важливо мати тихе місце, де ви зможете зосереджено займатися без сторонніх осіб. Також необхідні стабільний інтернет та заряджені пристрої: ноутбук або ПК для зв'язку зі мною через додаток Zoom, а також веб-камера, мікрофон та навушники (або гарнітура). Додатково, вам знадобиться другий пристрій з Telegram для відтворення необхідних файлів mp3, які я буду надсилати під час уроку.",
	},
	{
		question: 'Які стилі вокалу ви викладаєте?',
		answer:
			'Я спеціалізуюсь на сучасному (чистому), рок та екстремальному вокалі.',
	},
	{
		question: 'Чи можна здійснити оплату за навчання у валюті іншої країни?',
		answer:
			'Так, оплату можна здійснити через WayForPay у євро, доларах або злотих. Зверніть увагу, що ціна може бути дещо вищою через комісію системи (2%) та конвертацію валют.',
	},
]

const FaqSection = () => {
	return (
		<section className='py-20 bg-gray-100'>
			<div className='container mx-auto px-4'>
				<h2 className='text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900'>
					Поширені запитання
				</h2>

				<div className='max-w-3xl mx-auto space-y-4'>
					{faqs.map((faq, index) => (
						<FaqItem key={index} faq={faq} index={index} />
					))}
				</div>
			</div>
		</section>
	)
}

const FaqItem = ({
	faq,
	index,
}: {
	faq: { question: string; answer: string }
	index: number
}) => {
	const [isOpen, setIsOpen] = useState(index === 0)

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
			className='bg-white rounded-xl shadow-md overflow-hidden'
		>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='w-full flex justify-between items-center p-6 text-left focus:outline-none cursor-pointer'
			>
				<h3 className='text-lg font-bold text-gray-900'>{faq.question}</h3>
				<span className='ml-4 text-blue-500'>{isOpen ? '−' : '+'}</span>
			</button>

			<motion.div
				initial={false}
				animate={{ height: isOpen ? 'auto' : 0 }}
				transition={{ duration: 0.3 }}
				className='overflow-hidden'
			>
				<div className='px-6 pb-6 pt-0 text-gray-700'>{faq.answer}</div>
			</motion.div>
		</motion.div>
	)
}

export default FaqSection
