import { CalendarIcon } from 'lucide-react'
import { useLocale } from 'next-intl'
import { Control } from 'react-hook-form'

import {
	Button,
	Calendar,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	PopoverContent,
	PopoverMain,
	PopoverTrigger
} from '@/shared/ui/external'

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
						{label && (
							<FormLabel className='text-sm dark:text-gray-300'>
								{label}
							</FormLabel>
						)}

						<PopoverMain>
							<PopoverTrigger asChild>
								<Button
									type='button'
									variant='transparent'
									className='w-52 justify-start text-left font-normal'
								>
									<CalendarIcon size={16} />
									{date ? (
										new Intl.DateTimeFormat(locale, {
											dateStyle: 'medium'
										}).format(date)
									) : (
										<span className='text-muted-foreground'>
											{placeholder}
										</span>
									)}
								</Button>
							</PopoverTrigger>

							<PopoverContent>
								<Calendar
									mode='single'
									selected={date}
									disabled={{ before: new Date() }}
									onSelect={date => {
										if (!date) return

										const iso = date.toISOString()
										field.onChange(iso)
										onChange?.(iso)
									}}
								/>
							</PopoverContent>
						</PopoverMain>

						<FormMessage />
					</FormItem>
				)
			}}
		/>
	)
}
