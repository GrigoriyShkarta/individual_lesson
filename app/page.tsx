import AboutSection from '@/sections/AboutSection'
import ApproachSection from '@/sections/ApproachSection'
import ConditionsSection from '@/sections/ConditionsSection'
import CtaSection from '@/sections/CtaSection'
import FaqSection from '@/sections/FaqSection'
import Footer from '@/sections/Footer'
import Header from '@/sections/Header'
import HeroSection from '@/sections/HeroSection'
import PricingSection from '@/sections/PricingSection'
import ResultsSection from '@/sections/ResultsSection'
import ReviewsSection from '@/sections/ReviewsSection'
import ShapesDecorations from '@/sections/ShapesDecorations'
import Head from 'next/head'

export default function Home() {
	return (
		<>
			<Head>
				<title>
					Індивідуальні уроки сучасного вокалу | Професійний викладач
				</title>
				<meta
					name='description'
					content='Професійні уроки сучасного, рок та екстремального вокалу з індивідуальним підходом. Розкрий свій голосовий потенціал!'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<ShapesDecorations />

			<Header />

			<main>
				<HeroSection />
				<AboutSection />
				<PricingSection />
				<ApproachSection />
				<ResultsSection />
				<ReviewsSection />
				<FaqSection />
				<ConditionsSection />
				<CtaSection />
			</main>

			<Footer />
		</>
	)
}
