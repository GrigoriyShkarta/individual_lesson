import Button from '@/ui/Button'

const ConditionsSection = () => {
	return (
		<section className='py-20 bg-white'>
			<div className='container mx-auto px-4'>
				<div className='max-w-3xl mx-auto bg-gray-50 rounded-xl shadow-lg p-8 md:p-12'>
					<h2 className='text-3xl md:text-4xl font-bold mb-6 text-center text-gray-900'>
						Умови навчання
					</h2>

					<div className='space-y-6 mb-8'>
						<p className='text-gray-700 text-center'>
							Ваша перша оплата підтверджує, що ви погоджуєтесь з даними
							умовами.
						</p>
					</div>

					<div className='text-center'>
						<Button
							variant='primary'
							as='a'
							href='https://drive.google.com/file/d/1OEaxTYuGeu_qAlHUU5Ox0y8tautoE7Sw/view?usp=drivesdk'
							target='_blank'
							rel='noopener noreferrer'
						>
							Переглянути матеріали на Google Диску
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}

export default ConditionsSection
