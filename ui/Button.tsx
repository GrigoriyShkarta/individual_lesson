import React, { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'white'

interface BaseProps {
	variant?: ButtonVariant
	size?: 'sm' | 'md' | 'lg'
	className?: string
	children: React.ReactNode
}

type ButtonProps = BaseProps &
	ButtonHTMLAttributes<HTMLButtonElement> & {
		as?: 'button'
	}

type LinkProps = BaseProps &
	AnchorHTMLAttributes<HTMLAnchorElement> & {
		as: 'a'
		href: string
	}

type NextLinkProps = BaseProps &
	AnchorHTMLAttributes<HTMLAnchorElement> & {
		as: 'nextLink'
		href: string
	}

type Props = ButtonProps | LinkProps | NextLinkProps

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
	(
		{ variant = 'primary', size = 'md', className = '', children, ...props },
		ref
	) => {
		const baseClasses =
			'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'

		const sizeClasses = {
			sm: 'px-4 py-2 text-sm',
			md: 'px-6 py-3 text-base',
			lg: 'px-8 py-4 text-lg',
		}

		const variantClasses = {
			primary:
				'bg-blue-600 text-white hover:bg-blue-700 shadow hover:shadow-md',
			secondary:
				'bg-gray-800 text-white hover:bg-gray-900 shadow hover:shadow-md',
			outline:
				'bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-blue-50',
			white:
				'bg-white text-blue-600 hover:bg-gray-100 shadow-lg hover:shadow-xl',
		}

		const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className} cursor-pointer`

		if ('as' in props) {
			if (props.as === 'a') {
				const { ...rest } = props
				return (
					<a
						{...rest}
						className={classes}
						ref={ref as React.ForwardedRef<HTMLAnchorElement>}
					>
						{children}
					</a>
				)
			} else if (props.as === 'nextLink') {
				const { ...rest } = props
				return (
					<Link
						{...rest}
						className={classes}
						ref={ref as React.ForwardedRef<HTMLAnchorElement>}
					>
						{children}
					</Link>
				)
			}
		}

		return (
			<button
				{...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
				className={classes}
				ref={ref as React.ForwardedRef<HTMLButtonElement>}
			>
				{children}
			</button>
		)
	}
)

Button.displayName = 'Button'

export default Button
