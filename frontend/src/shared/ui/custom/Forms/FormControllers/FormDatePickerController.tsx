import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Control } from 'react-hook-form'

import {
	Button,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/shared/ui/external'
import { Calendar } from '@/shared/ui/external/Calendar/Calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/shared/ui/external/Popover/Popover'

interface FormDatePickerControllerProps {
	name: string
	control: Control<any>
	label: string
}

export const FormDatePickerController = ({
	name,
	control,
	label
}: FormDatePickerControllerProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => {
				const date = field.value ? new Date(field.value) : undefined

				return (
					<FormItem>
						{label && <FormLabel>{label}</FormLabel>}

						<Popover>
							<PopoverTrigger>
								<Button
									type='button'
									variant='outline'
									className='w-48 justify-start text-left font-normal'
								>
									<CalendarIcon />
									{date
										? format(date, 'PPP')
										: 'Выберите дату'}
								</Button>
							</PopoverTrigger>

							<PopoverContent>
								<Calendar
									mode='single'
									selected={date}
									onSelect={date => {
										if (date)
											field.onChange(date.toISOString())
									}}
								/>
							</PopoverContent>
						</Popover>

						<FormMessage />
					</FormItem>
				)
			}}
		/>
	)
}
