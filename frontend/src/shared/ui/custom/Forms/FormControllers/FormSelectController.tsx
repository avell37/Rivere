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

interface FormSelectControllerProps<T extends FieldValues> {
	name: Path<T>
	control: Control<T>
	icon?: React.ReactNode
	label: string
	placeholder: string
	onChange?: (value: string) => void
	options: {
		value: string
		label: string
		icon?: React.ReactNode
	}[]
}

export const FormSelectController = <T extends FieldValues>({
	name,
	control,
	icon,
	label,
	placeholder,
	onChange,
	options
}: FormSelectControllerProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
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
					>
						<SelectTrigger
							className='w-48 cursor-pointer hover:bg-accent 
						hover:text-accent-foreground dark:hover:bg-input/50 transition-all'
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
