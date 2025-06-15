'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface VideoPlayerProps {
	src: string
	small?: boolean
	autoPlay?: boolean
	muted?: boolean
	loop?: boolean
	controls?: boolean
	className?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
	src,
	small = false,
	autoPlay = false,
	muted = false,
	loop = false,
	controls = true,
	className = '',
}) => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const [isPlaying, setIsPlaying] = useState(autoPlay)
	const [progress, setProgress] = useState(0)
	const [duration, setDuration] = useState(0)
	const [isFullscreen, setIsFullscreen] = useState(false)

	// Слушаем события play/pause для корректного состояния
	const handlePlay = () => setIsPlaying(true)
	const handlePause = () => setIsPlaying(false)

	// Слушаем выход из fullscreen
	useEffect(() => {
		const handleFullscreenChange = () => {
			if (!document.fullscreenElement) setIsFullscreen(false)
		}
		document.addEventListener('fullscreenchange', handleFullscreenChange)
		return () =>
			document.removeEventListener('fullscreenchange', handleFullscreenChange)
	}, [])

	// Обработчики событий видео
	const togglePlay = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause()
			} else {
				videoRef.current.play()
			}
		}
	}

	const handleTimeUpdate = () => {
		if (videoRef.current) {
			const currentProgress =
				(videoRef.current.currentTime / videoRef.current.duration) * 100
			setProgress(currentProgress)
		}
	}

	const handleLoadedMetadata = () => {
		if (videoRef.current) {
			setDuration(videoRef.current.duration)
		}
	}

	const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newTime = (parseInt(e.target.value) / 100) * duration
		if (videoRef.current) {
			videoRef.current.currentTime = newTime
		}
	}

	const toggleFullscreen = () => {
		if (videoRef.current) {
			if (!document.fullscreenElement) {
				videoRef.current.requestFullscreen().catch(err => {
					console.error(`Error attempting to enable fullscreen: ${err.message}`)
				})
				setIsFullscreen(true)
			} else {
				document.exitFullscreen()
				setIsFullscreen(false)
			}
		}
	}

	// Форматирование времени
	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60)
		const seconds = Math.floor(time % 60)
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
	}

	// Эффект для авто-воспроизведения
	useEffect(() => {
		if (autoPlay && videoRef.current) {
			videoRef.current.play().catch(error => {
				console.log('Auto-play was prevented:', error)
			})
		}
	}, [autoPlay])

	return (
		<div className={`relative ${small ? 'w-full' : 'w-full'} ${className}`}>
			<video
				ref={videoRef}
				src={src}
				className={`w-full ${
					small ? 'rounded-lg' : 'rounded-xl'
				} bg-black max-h-[252px] max-sm:max-h-[166px]`}
				playsInline
				autoPlay={autoPlay}
				muted={muted}
				loop={loop}
				onTimeUpdate={handleTimeUpdate}
				onLoadedMetadata={handleLoadedMetadata}
				onClick={togglePlay}
				onPlay={handlePlay}
				onPause={handlePause}
			/>

			{/* Кастомные элементы управления */}
			{controls && (
				<motion.div
					className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent z-20 ${
						small ? 'p-2 min-h-12' : 'p-4 min-h-16'
					} flex flex-col justify-end`}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
				>
					{/* Прогресс бар */}
					<input
						type='range'
						min='0'
						max='100'
						value={progress}
						onChange={handleProgressChange}
						className='w-full h-1.5 mb-2 rounded-full appearance-none bg-gray-600 cursor-pointer'
						style={{
							background: `linear-gradient(to right, #8b5cf6 ${progress}%, #4b5563 ${progress}%)`,
						}}
					/>

					<div className='flex items-center justify-between'>
						{/* Кнопка Play/Pause */}
						<button
							onClick={togglePlay}
							className='text-white hover:text-blue-300 transition-colors cursor-pointer'
							aria-label={isPlaying ? 'Pause' : 'Play'}
							type='button'
						>
							{isPlaying ? (
								<svg
									className='w-6 h-6'
									fill='currentColor'
									viewBox='0 0 20 20'
								>
									<path
										fillRule='evenodd'
										d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z'
										clipRule='evenodd'
									/>
								</svg>
							) : (
								<svg
									className='w-6 h-6'
									fill='currentColor'
									viewBox='0 0 20 20'
								>
									<path
										fillRule='evenodd'
										d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
										clipRule='evenodd'
									/>
								</svg>
							)}
						</button>

						{/* Время */}
						<div className='text-white text-sm'>
							{formatTime((progress / 100) * duration)} / {formatTime(duration)}
						</div>

						{/* Кнопка Fullscreen справа от времени */}
						<button
							onClick={toggleFullscreen}
							className='text-white hover:text-blue-300 transition-colors ml-2 cursor-pointer'
							aria-label='Fullscreen'
							type='button'
						>
							{isFullscreen ? (
								<svg
									className='w-6 h-6'
									fill='currentColor'
									viewBox='0 0 20 20'
								>
									<path
										fillRule='evenodd'
										d='M5 16h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3v-3a1 1 0 10-2 0v3H5a1 1 0 100 2zm7-13H9V0a1 1 0 10-2 0v3H4a1 1 0 100 2h3v3a1 1 0 102 0V5h3a1 1 0 100-2z'
										clipRule='evenodd'
									/>
								</svg>
							) : (
								<svg
									className='w-6 h-6'
									fill='currentColor'
									viewBox='0 0 20 20'
								>
									<path
										fillRule='evenodd'
										d='M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z'
										clipRule='evenodd'
									/>
								</svg>
							)}
						</button>
					</div>
				</motion.div>
			)}

			{/* Overlay для индикации воспроизведения */}
			{!isPlaying && !autoPlay && (
				<div
					className='absolute inset-0 flex items-center justify-center pointer-events-none z-10' // pointer-events-none чтобы не блокировать controls
				>
					<button
						className='p-4 bg-black/50 rounded-full hover:bg-black/70 transition-colors cursor-pointer pointer-events-auto'
						aria-label='Play video'
						type='button'
						onClick={togglePlay}
					>
						<svg
							className='w-10 h-10 text-white'
							fill='currentColor'
							viewBox='0 0 20 20'
						>
							<path
								fillRule='evenodd'
								d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
								clipRule='evenodd'
							/>
						</svg>
					</button>
				</div>
			)}
		</div>
	)
}

export default VideoPlayer
