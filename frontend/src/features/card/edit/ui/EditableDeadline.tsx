'use client'
import { X } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { FormDatePickerController } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

import { useUpdateCard } from '../model/hooks/useUpdateCard'
import { EditableProps } from '../model/types/EditableProps'

export const EditableDeadline = ({ cardId, t }: EditableProps) => {
	const { control, setValue, watch } = useFormContext()
	const deadline = watch('deadline')

	const { handleChange } = useUpdateCard(cardId, 'deadline')

	return (
		<div className='flex items-center justify-center gap-2'>
			<FormDatePickerController
				name='deadline'
				label={t('editDeadlineLabel')}
				placeholder={t('editDeadlinePlaceholder')}
				control={control}
				onChange={date => handleChange(date)}
			/>
			{deadline != null && (
				<Button
					variant='none'
					size='none'
					className='mt-6'
					onClick={() => {
						setValue('deadline', null)
						handleChange(null)
					}}
				>
					<X className='size-4' />
				</Button>
			)}
		</div>
	)
}
