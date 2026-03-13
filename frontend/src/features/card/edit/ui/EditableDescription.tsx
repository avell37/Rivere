'use client'
import { useFormContext } from 'react-hook-form'

import { FormTextareaController } from '@/shared/ui/custom'

import { useUpdateCard } from '../model/hooks/useUpdateCard'
import { EditableProps } from '../model/types/EditableProps'

export const EditableDescription = ({ cardId }: EditableProps) => {
	const { control, watch } = useFormContext()
	const descriptionValue = watch('description')

	const { isEditing, setIsEditing, handleBlur, isLoading } = useUpdateCard(
		cardId,
		'description'
	)

	if (!isEditing) {
		return (
			<FormTextareaController
				name='description'
				className='rounded break-all resize-none pr-4 whitespace-pre-wrap'
				control={control}
				disabled={isLoading}
				onClick={() => setIsEditing(true)}
			/>
		)
	}

	return (
		<FormTextareaController
			name='description'
			className='rounded break-all resize-none pr-4'
			control={control}
			autoFocus
			disabled={isLoading}
			onBlur={() => handleBlur(descriptionValue)}
		/>
	)
}
