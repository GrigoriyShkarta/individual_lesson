const ShapesDecorations = () => {
	return (
		<div className='fixed inset-0 overflow-hidden pointer-events-none -z-10'>
			{/* Абстрактные формы для украшения */}
			<div className='absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-100 opacity-20 blur-3xl'></div>
			<div className='absolute bottom-20 right-10 w-80 h-80 rounded-full bg-indigo-100 opacity-20 blur-3xl'></div>
			<div className='absolute top-1/2 left-1/4 w-40 h-40 rotate-45 bg-pink-100 opacity-15 blur-2xl'></div>
		</div>
	)
}

export default ShapesDecorations
