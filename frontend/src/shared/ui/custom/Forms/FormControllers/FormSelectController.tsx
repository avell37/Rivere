import { Control, FieldValues, Path } from 'react-hook-form'

import {
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/ui/external'
import { cn } from '@/shared/utils'

interface FormSelectControllerProps<T extends FieldValues> {
	name: Path<T>
	control: Control<T>
	icon?: React.ReactNode
	label?: string
	placeholder?: string
	className?: string
	onChange?: (value: string) => void
	options: {
		value: string
		label: string
		icon?: React.ReactNode
	}[]
	disabled?: boolean
}

export const FormSelectController = <T extends FieldValues>({
	name,
	control,
	icon,
	label,
	placeholder,
	className,
	onChange,
	options,
	disabled
}: FormSelectControllerProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='w-full'>
					{label && (
						<FormLabel className='flex gap-1 text-sm dark:text-gray-300'>
							{icon}
							{label}
						</FormLabel>
					)}

					<Select
						value={field.value}
						onValueChange={value => {
							field.onChange(value)
							onChange?.(value)
						}}
						disabled={disabled}
					>
						<SelectTrigger
							className={cn(
								'cursor-pointer hover:bg-accent hover:text-accent-foreground dark:hover:bg-input/50 transition-all',
								className
							)}
						>
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>
						<SelectContent className='w-full'>
							{options.map(opt => (
								<SelectItem key={opt.value} value={opt.value}>
									<div className='flex items-center gap-2'>
										{opt.icon}
										{opt.label}
									</div>
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
