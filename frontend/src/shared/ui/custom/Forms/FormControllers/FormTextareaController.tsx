import { Control, FieldValues, Path } from 'react-hook-form'

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Textarea
} from '@/shared/ui/external'

interface FormTextareaProps<T extends Record<string, any>> {
	name: Path<T>
	control: Control<T>
	label?: string
	placeholder?: string
	className?: string
	autoFocus?: boolean
	disabled?: boolean
	onBlur?: () => void
}

export const FormTextareaController = <T extends FieldValues>({
	name,
	control,
	label,
	placeholder,
	className,
	autoFocus,
	disabled,
	onBlur
}: FormTextareaProps<T>) => {
	return (
		<FormField
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<FormItem className={`flex flex-col gap-2.5 ${className}`}>
					{label && (
						<FormLabel className='text-gray-400 text-sm block'>
							{label}
						</FormLabel>
					)}

					<FormControl>
						<Textarea
							{...field}
							className={`border text-start rounded-lg text-white outline-none break-all transition-all resize-none
                                ${
									fieldState.error
										? 'border-red-600 hover:border-red-800'
										: 'border-primary-900/30 hover:border-primary-900'
								}`}
							placeholder={placeholder}
							autoFocus={autoFocus}
							disabled={disabled}
							onBlur={() => {
								field.onBlur()
								onBlur?.()
							}}
						/>
					</FormControl>

					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
