import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useLocale } from 'next-intl'
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
	placeholder: string
	onChange?: (value: string) => void
}

export const FormDatePickerController = ({
	name,
	control,
	label,
	placeholder,
	onChange
}: FormDatePickerControllerProps) => {
	const locale = useLocale()

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
							<PopoverTrigger asChild>
								<Button
									type='button'
									variant='outline'
									className='w-48 justify-start text-left font-normal'
								>
									<CalendarIcon />
									{date
										? new Intl.DateTimeFormat(locale, {
												dateStyle: 'medium'
											}).format(date)
										: placeholder}
								</Button>
							</PopoverTrigger>

							<PopoverContent>
								<Calendar
									mode='single'
									selected={date}
									onSelect={date => {
										if (!date) return

										const iso = date.toISOString()
										field.onChange(iso)
										onChange?.(iso)
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
