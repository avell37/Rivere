import { ReactNode } from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Textarea
} from '@/shared/ui/external'
import { cn } from '@/shared/utils'

interface FormTextareaProps<T extends FieldValues> {
	name: Path<T>
	control: Control<T>
	label?: string
	icon?: ReactNode
	placeholder?: string
	itemClassName?: string
	className?: string
	rows?: number
	autoFocus?: boolean
	disabled?: boolean
	readOnly?: boolean
	onClick?: () => void
	onFocus?: () => void
	onBlur?: () => void
}

export const FormTextareaController = <T extends FieldValues>({
	name,
	control,
	label,
	icon,
	placeholder,
	itemClassName,
	className,
	rows = 4,
	autoFocus,
	disabled,
	readOnly,
	onClick,
	onFocus,
	onBlur
}: FormTextareaProps<T>) => {
	return (
		<FormField
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<FormItem className={cn('w-full', itemClassName)}>
					{label && (
						<FormLabel className='flex items-center gap-1.5 text-sm dark:text-gray-300'>
							{icon}
							{label}
						</FormLabel>
					)}

					<FormControl>
						<Textarea
							{...field}
							value={field.value ?? ''}
							rows={rows}
							className={cn(
								'min-h-20 resize-none wrap-break-word',
								fieldState.error &&
									'border-destructive focus-visible:border-destructive',
								className
							)}
							placeholder={placeholder}
							autoFocus={autoFocus}
							disabled={disabled}
							readOnly={readOnly}
							onClick={onClick}
							onFocus={() => {
								onFocus?.()
							}}
							onBlur={() => {
								field.onBlur()
								onBlur?.()
							}}
						/>
					</FormControl>

					<FormMessage className='wrap-break-word' />
				</FormItem>
			)}
		/>
	)
}
