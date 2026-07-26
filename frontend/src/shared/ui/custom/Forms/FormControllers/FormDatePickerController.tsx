'use client'

import { CalendarIcon, X } from 'lucide-react'
import { useLocale } from 'next-intl'
import { useState } from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'

import {
	Button,
	Calendar,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	PopoverContent,
	PopoverMain,
	PopoverTrigger,
	Separator
} from '@/shared/ui/external'
import { cn } from '@/shared/utils'

interface FormDatePickerControllerProps<T extends FieldValues> {
	name: Path<T>
	control: Control<T>
	icon?: React.ReactNode
	label: string
	placeholder: string
	disabled?: boolean
	className?: string
	onChange?: (value: string | null) => void
	clearable?: boolean
	clearLabel?: string
	popoverFooter?: React.ReactNode
}

export const FormDatePickerController = <T extends FieldValues>({
	name,
	control,
	icon,
	label,
	placeholder,
	disabled,
	className,
	onChange,
	clearable = false,
	clearLabel,
	popoverFooter
}: FormDatePickerControllerProps<T>) => {
	const locale = useLocale()
	const [open, setOpen] = useState(false)

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => {
				const date = field.value ? new Date(field.value) : undefined
				const showClearAction = clearable && Boolean(date)

				const handleClear = () => {
					field.onChange(null)
					onChange?.(null)
					setOpen(false)
				}

				return (
					<FormItem>
						{label && (
							<FormLabel className='flex gap-1 text-sm dark:text-gray-300'>
								{icon}
								{label}
							</FormLabel>
						)}

						<PopoverMain open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild>
								<Button
									type='button'
									variant='transparent'
									className={
										className
											? className
											: 'w-52 justify-start text-left font-normal'
									}
									disabled={disabled}
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

							<PopoverContent className='w-auto p-0'>
								<Calendar
									mode='single'
									selected={date}
									disabled={{ before: new Date() }}
									onSelect={selectedDate => {
										if (!selectedDate) return

										const iso = selectedDate.toISOString()
										field.onChange(iso)
										onChange?.(iso)
										setOpen(false)
									}}
								/>

								{(popoverFooter || showClearAction) && (
									<>
										<Separator />
										<div className='p-2'>
											{popoverFooter ?? (
												<Button
													type='button'
													variant='ghost'
													size='sm'
													className={cn(
														'h-8 w-full justify-start gap-2 px-2 text-muted-foreground',
														'hover:bg-destructive/10 hover:text-destructive'
													)}
													onClick={handleClear}
												>
													<X className='size-3.5' />
													{clearLabel}
												</Button>
											)}
										</div>
									</>
								)}
							</PopoverContent>
						</PopoverMain>

						<FormMessage />
					</FormItem>
				)
			}}
		/>
	)
}
