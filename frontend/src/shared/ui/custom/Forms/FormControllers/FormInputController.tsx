import { ReactNode } from 'react'
import { Control, FieldErrors } from 'react-hook-form'

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from '@/shared/ui/external'

interface FormInputControllerProps {
	name: string
	control: Control<any>
	placeholder?: string
	type?: string
	icon?: ReactNode
	element?: ReactNode
	className?: string
	label?: string
	errors?: FieldErrors
	autoFocus?: boolean
	disabled?: boolean
	onBlur?: () => void
}

export const FormInputController = ({
	name,
	control,
	placeholder = '',
	type = 'text',
	icon,
	element,
	label,
	className = '',
	autoFocus,
	disabled,
	onBlur
}: FormInputControllerProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && (
						<FormLabel className='text-sm dark:text-gray-300'>
							{label}
						</FormLabel>
					)}
					<div className='relative'>
						{icon && (
							<span className='absolute left-3 top-2.5'>
								{icon}
							</span>
						)}

						<FormControl>
							<Input
								{...field}
								type={type}
								placeholder={placeholder}
								className={className}
								autoFocus={autoFocus}
								disabled={disabled}
								onBlur={() => {
									field.onBlur()
									onBlur?.()
								}}
							/>
						</FormControl>

						{element && (
							<span className='absolute right-2 top-1.5'>
								{element}
							</span>
						)}
					</div>

					<FormMessage className='wrap-break-word' />
				</FormItem>
			)}
		/>
	)
}
