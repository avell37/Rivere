import { Control } from 'react-hook-form'

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

interface FormSelectControllerProps {
	name: string
	control: Control<any>
	label: string
	placeholder: string
	onChange?: (value: any) => void
	options: {
		value: string
		label: string
		icon?: React.ReactNode
	}[]
}

export const FormSelectController = ({
	name,
	control,
	label,
	placeholder,
	onChange,
	options
}: FormSelectControllerProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}

					<Select
						value={field.value}
						onValueChange={value => {
							field.onChange(value)
							onChange?.(value)
						}}
					>
						<SelectTrigger className='w-48'>
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
