'use client'

import { FieldValues } from 'react-hook-form'

import {
	BanDurationFieldsProps,
	BanDurationUnit,
	FormInputController,
	FormSelectController
} from '@/shared/ui/custom'

export const banDurationOptions = (t: (key: string) => string) => [
	{
		value: BanDurationUnit.SECONDS,
		label: t('unit.seconds')
	},
	{
		value: BanDurationUnit.MINUTES,
		label: t('unit.minutes')
	},
	{
		value: BanDurationUnit.HOURS,
		label: t('unit.hours')
	},
	{
		value: BanDurationUnit.DAYS,
		label: t('unit.days')
	}
]

export const BanDurationFields = <T extends FieldValues>({
	control,
	disabled,
	t,
	reasonName,
	durationName,
	unitName
}: BanDurationFieldsProps<T>) => (
	<div className='flex flex-col gap-4'>
		<FormInputController
			name={reasonName}
			label={t('banReasonLabel')}
			placeholder={t('banReasonPlaceholder')}
			control={control}
			disabled={disabled}
		/>
		<div className='flex items-end gap-2'>
			<FormInputController
				name={durationName}
				label={t('durationLabel')}
				placeholder={t('durationPlaceholder')}
				className='flex-1 w-full'
				control={control}
				disabled={disabled}
			/>
			<FormSelectController
				name={unitName}
				className='flex-1 w-full'
				control={control}
				options={banDurationOptions(t)}
				disabled={disabled}
			/>
		</div>
	</div>
)
