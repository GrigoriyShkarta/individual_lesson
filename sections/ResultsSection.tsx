'use client'

import VideoPlayer from '@/ui/VideoPlayer'

const videoFiles = ['1.mp4', '5.mp4', '3.mp4', '4.mp4', '2.mp4', '6.mp4']

const ResultsSection = () => {
	return (
		<section id={'results'} className='py-20 bg-white'>
			<div className='container mx-auto px-4'>
				<h2 className='text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900'>
					Результати учнів
				</h2>

				<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{videoFiles.map((file, idx) => (
						<div
							key={idx}
							className='bg-gray-50 rounded-xl overflow-hidden shadow-lg p-4 flex flex-col items-center'
						>
							<div className='aspect-video w-full bg-black rounded-lg overflow-hidden mb-2'>
								<VideoPlayer src={`/assets/${file}`} />
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

export default ResultsSection
