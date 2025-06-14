'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/ui/Button'

const Header = () => {
	const [isScrolled, setIsScrolled] = useState(false)
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const navLinks = [
		{ name: 'Про мене', href: '#about' },
		{ name: 'Варіанти навчання', href: '#pricing' },
		{ name: 'Мій підхід', href: '#approach' },
		{ name: 'Результати', href: '#results' },
		{ name: 'Відгуки', href: '#reviews' },
	]

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen)
		document.body.style.overflow = mobileMenuOpen ? 'auto' : 'hidden'
	}

	return (
		<header
			className={`fixed w-full z-50 transition-all duration-300 ${
				isScrolled || mobileMenuOpen
					? 'bg-white shadow-md py-2'
					: 'bg-transparent py-4'
			}`}
		>
			<div className='container mx-auto px-4'>
				<div className='flex justify-between items-center'>
					{/* Логотип */}
					<Link href='/' className='flex items-center'>
						<span className='text-2xl font-bold bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 bg-clip-text text-transparent'>
							YS Vocal Coach
						</span>
					</Link>

					{/* Десктоп навигация */}
					<nav className='hidden md:flex items-center space-x-8'>
						{navLinks.map(link => (
							<Link
								key={link.href}
								href={link.href}
								className='text-gray-700 hover:text-blue-600 transition-colors font-medium'
							>
								{link.name}
							</Link>
						))}
					</nav>

					{/* Кнопка записи (десктоп) */}
					<div className='hidden md:block'>
						<Button
							variant='primary'
							as='button'
							size='sm'
							onClick={() => {
								const pricingSection = document.getElementById('pricing')
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

					{/* Кнопка мобильного меню */}
					<button
						className='md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						onClick={toggleMobileMenu}
						aria-label='Меню'
					>
						<div className='w-6 flex flex-col gap-1'>
							<span
								className={`h-0.5 bg-gray-800 rounded-full transition-all ${
									mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
								}`}
							></span>
							<span
								className={`h-0.5 bg-gray-800 rounded-full transition-all ${
									mobileMenuOpen ? 'opacity-0' : 'opacity-100'
								}`}
							></span>
							<span
								className={`h-0.5 bg-gray-800 rounded-full transition-all ${
									mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
								}`}
							></span>
						</div>
					</button>
				</div>

				{/* Мобильное меню */}
				<AnimatePresence>
					{mobileMenuOpen && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: 'auto' }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3 }}
							className='md:hidden overflow-hidden bg-white' // Добавлен bg-white
						>
							<nav className='flex flex-col space-y-4 py-4'>
								{navLinks.map(link => (
									<Link
										key={link.href}
										href={link.href}
										className='text-gray-700 hover:text-blue-600 transition-colors font-medium py-2 px-4'
										onClick={() => {
											setMobileMenuOpen(false)
											document.body.style.overflow = 'auto'
										}}
									>
										{link.name}
									</Link>
								))}
								<Button
									variant='primary'
									as='nextLink'
									href='#pricing'
									className='w-full mt-2'
									onClick={() => {
										setMobileMenuOpen(false)
										document.body.style.overflow = 'auto'
									}}
								>
									Записатися
								</Button>
							</nav>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</header>
	)
}

export default Header
