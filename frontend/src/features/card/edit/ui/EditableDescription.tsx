import { useFormContext } from 'react-hook-form'

import { FormTextareaController } from '@/shared/ui/custom'

import { useUpdateCard } from '../model/hooks/useUpdateCard'
import { EditableProps } from '../model/types/EditableProps'

export const EditableDescription = ({ cardId }: EditableProps) => {
	const { control, getValues, watch } = useFormContext()
	const descriptionValue = watch('description')

	const { isEditing, setIsEditing, handleBlur, isLoading } = useUpdateCard(
		cardId,
		'description'
	)

	if (!isEditing) {
		return (
			<p
				className='text-xs cursor-pointer break-all pr-4'
				onClick={() => setIsEditing(true)}
			>
				{descriptionValue || 'Добавить описание'}
			</p>
		)
	}

	return (
		<FormTextareaController
			name='description'
			className='border rounded p-4 break-all resize-none'
			control={control}
			autoFocus
			disabled={isLoading}
			onBlur={() => handleBlur(descriptionValue)}
		/>
	)
}
