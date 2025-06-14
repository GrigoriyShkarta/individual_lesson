import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title:
		'Індивідуальні уроки сучасного, рок та екстремального вокалу | Професійний викладач',
	description:
		'Професійні уроки сучасного, рок та екстремального вокалу з індивідуальним підходом. Розкрий свій голосовий потенціал!',
	keywords: [
		'яна сабада',
		'уроки вокалу',
		'уроки вокала',
		'экстримальный вокал',
		'сучасний вокал',
		'екстрим вокал',
		'рок вокал',
		'індивідуальні уроки',
		'викладач вокалу',
		'навчання співу',
		'вокал онлайн',
		'вокальна школа',
		'розвиток голосу',
	],
	authors: [{ name: 'Яна Сабада' }],
	viewport: 'width=device-width, initial-scale=1',
	openGraph: {
		title: 'Індивідуальні уроки сучасного вокалу | Професійний викладач',
		description:
			'Професійні уроки сучасного, рок та екстремального вокалу з індивідуальним підходом. Розкрий свій голосовий потенціал!',
		type: 'website',
		url: 'https://your-domain.com/',
		images: [
			{
				url: 'https://your-domain.com/assets/ys_vocalcoach.png',
				width: 1200,
				height: 630,
				alt: 'Викладач вокалу Яна Сабада',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Індивідуальні уроки сучасного вокалу | Професійний викладач',
		description:
			'Професійні уроки сучасного, рок та екстремального вокалу з індивідуальним підходом. Розкрий свій голосовий потенціал!',
		images: ['https://your-domain.com/assets/ys_vocalcoach.png'],
	},
	icons: {
		icon: '/favicon.ico',
		apple: '/apple-touch-icon.png',
		shortcut: '/favicon-32x32.png',
	},
	metadataBase: new URL('https://your-domain.com/'),
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	)
}
