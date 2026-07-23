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

interface LegalAgreementsCheckboxProps<T extends FieldValues> {
	control: Control<T>
	name: FieldPath<T>
	isPending?: boolean
}

export const LegalAgreementsCheckbox = <T extends FieldValues>({
	control,
	name,
	isPending
}: LegalAgreementsCheckboxProps<T>) => {
	const t = useTranslations()

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className='flex flex-col'>
					<div className='flex items-start gap-2'>
						<Checkbox
							checked={field.value}
							onCheckedChange={field.onChange}
							disabled={isPending}
							className='mt-0.5'
						/>

						<Label className='text-sm leading-snug max-w-full font-normal'>
							<span className='wrap-break-word'>
								{t.rich('legal.checkbox.label', {
									termsLink: (chunks: React.ReactNode) => (
										<Link
											href={PUBLIC_URL.terms()}
											className='underline hover:text-primary'
										>
											{chunks}
										</Link>
									),
									privacyLink: (chunks: React.ReactNode) => (
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
