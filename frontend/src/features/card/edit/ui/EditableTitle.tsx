import { useFormContext } from 'react-hook-form'

import { FormInputController } from '@/shared/ui/custom'

import { useUpdateCard } from '../model/hooks/useUpdateCard'
import { EditableProps } from '../model/types/EditableProps'

export const EditableTitle = ({ cardId }: EditableProps) => {
	const { control, watch } = useFormContext()
	const titleValue = watch('title')

	const { isEditing, setIsEditing, handleBlur, isLoading } = useUpdateCard(
		cardId,
		'title'
	)

	return (
		<div onClick={() => setIsEditing(true)} className='pr-4'>
			{isEditing ? (
				<FormInputController
					name='title'
					className='border-b bg-transparent outline-none'
					control={control}
					autoFocus
					disabled={isLoading}
					onBlur={() => handleBlur(titleValue)}
				/>
			) : (
				<h3 className='text-2xl font-bold cursor-pointer'>
					{titleValue}
				</h3>
			)}
		</div>
	)
}
