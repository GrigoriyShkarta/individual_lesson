'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const Footer = () => {
	const currentYear = new Date().getFullYear()

	const footerLinks = [
		{
			title: 'Навігація',
			links: [
				{ name: 'Головна', href: '/' },
				{ name: 'Про мене', href: '#about' },
				{ name: 'Варіанти навчання', href: '#pricing' },
				{ name: 'Мій підхід', href: '#approach' },
				{ name: 'Результати', href: '#results' },
			],
		},
		{
			title: 'Контакти',
			links: [
				{
					name: 'Instagram',
					href: 'https://www.instagram.com/yana_vocalcoach/',
				},
				{
					name: 'Telegram',
					href: 'https://t.me/yana_vocalcoach',
				},
			],
		},
		// {
		// 	title: 'Документи',
		// 	links: [
		// 		{
		// 			name: 'Умови навчання',
		// 			href: 'https://drive.google.com/file/d/1OEaxTYuGeu_qAlHUU5Ox0y8tautoE7Sw/view?usp=drivesdk',
		// 		},
		// 	],
		// },
	]

	return (
		<footer className='bg-gray-900 text-gray-300 pt-16 pb-8'>
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12'>
					{/* Лого и описание */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.5 }}
						className='lg:col-span-1'
					>
						<Link href='/' className='flex items-center mb-4'>
							<span className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent'>
								YS Vocal Coach
							</span>
						</Link>
						<p className='mb-4'>
							Професійне навчання сучасному, рок та екстремальному вокалу з
							індивідуальним підходом.
						</p>
					</motion.div>

					{/* Колонки ссылок */}
					{footerLinks.map((column, index) => (
						<motion.div
							key={column.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.1 }}
							className='lg:col-span-1'
						>
							<h3 className='text-lg font-semibold text-white mb-4'>
								{column.title}
							</h3>
							<ul className='space-y-3'>
								{column.links.map(link => (
									<li key={link.name}>
										<Link
											href={link.href}
											className='text-gray-400 hover:text-white transition-colors'
										>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</div>

				{/* Нижняя часть футера */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className='pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center'
				>
					<p className='mb-4 md:mb-0'>
						© {currentYear} YS Vocal Coach. Всі права захищені.
					</p>
				</motion.div>
			</div>
		</footer>
	)
}

export default Footer
