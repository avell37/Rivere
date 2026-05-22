'use client'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Control, FieldPath, FieldValues } from 'react-hook-form'

import { PUBLIC_URL } from '@/shared/libs'

import {
	Checkbox,
	FormField,
	FormItem,
	FormMessage,
	Label
} from '../../external'

interface PrivacyCheckboxProps<T extends FieldValues> {
	control: Control<T>
	name: FieldPath<T>
	isPending?: boolean
}

export const PrivacyCheckbox = <T extends FieldValues>({
	control,
	name,
	isPending
}: PrivacyCheckboxProps<T>) => {
	const t = useTranslations()

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
							disabled={isPending}
						/>

						<Label className='text-sm leading-snug max-w-full'>
							<span className='break-words'>
								{t.rich('privacy.checkbox.label', {
									link: (chunks: React.ReactNode) => (
										<Link
											href={PUBLIC_URL.privacy()}
											className='underline hover:text-primary'
										>
											{chunks}
										</Link>
									)
								})}
							</span>
						</Label>
					</div>

					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
