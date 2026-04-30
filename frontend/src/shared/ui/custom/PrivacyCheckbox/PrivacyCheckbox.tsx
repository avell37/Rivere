'use client'
import Link from 'next/link'
import { Control, FieldValues } from 'react-hook-form'

import { PUBLIC_URL } from '@/shared/libs'

import { FormField, FormItem, FormMessage, Label } from '../../external'
import { Checkbox } from '../../external/Checkbox/Checkbox'

interface PrivacyCheckboxProps<T extends FieldValues> {
	control: Control<T>
	name: any
}

export const PrivacyCheckbox = <T extends FieldValues>({
	control,
	name
}: PrivacyCheckboxProps<T>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='flex flex-col'>
					<div className='flex items-center gap-2'>
						<Checkbox
							checked={field.value}
							onCheckedChange={field.onChange}
						/>

						<Label className='text-sm gap-1'>
							Я согласен с{' '}
							<Link
								href={PUBLIC_URL.privacy()}
								className='underline hover:text-primary'
							>
								политикой конфиденциальности
							</Link>
						</Label>
					</div>

					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
