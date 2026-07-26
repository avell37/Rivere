'use client'
import { Calendar } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { FormDatePickerController } from '@/shared/ui/custom'

import { useUpdateCard } from '../model/hooks/useUpdateCard'
import { EditableProps } from '../model/types/EditableProps'

export const EditableDeadline = ({ cardId, boardId, t }: EditableProps) => {
	const { control } = useFormContext()

	const { handleChange, isLoading } = useUpdateCard(
		cardId,
		boardId,
		'deadline'
	)

	return (
		<FormDatePickerController
			name='deadline'
			icon={<Calendar size={14} />}
			label={t('editDeadlineLabel')}
			placeholder={t('editDeadlinePlaceholder')}
			clearLabel={t('clearDeadline')}
			className='w-44 justify-start text-left font-normal'
			control={control}
			clearable
			onChange={date => handleChange(date)}
			disabled={isLoading}
		/>
	)
}
