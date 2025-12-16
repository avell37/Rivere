import { Control } from 'react-hook-form'

import { priorityCircle } from '@/shared/libs/priorityColors'
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
	onChange?: (value: any) => void
}

export const FormSelectController = ({
	name,
	control,
	label,
	onChange
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
							<SelectValue placeholder='Приоритет задачи' />
						</SelectTrigger>
						<SelectContent className='w-full'>
							<SelectItem value='LOW'>
								<div className='flex items-center gap-2'>
									<div className={priorityCircle.LOW} />
									Низкая
								</div>
							</SelectItem>
							<SelectItem value='MEDIUM'>
								<div className='flex items-center gap-2'>
									<div className={priorityCircle.MEDIUM} />
									Средняя
								</div>
							</SelectItem>
							<SelectItem value='HIGH'>
								<div className='flex items-center gap-2'>
									<div className={priorityCircle.HIGH} />
									Высокая
								</div>
							</SelectItem>
						</SelectContent>
					</Select>

					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
