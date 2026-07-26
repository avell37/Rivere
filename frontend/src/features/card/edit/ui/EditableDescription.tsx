'use client'

import { TextAlignJustify } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { FormTextareaController } from '@/shared/ui/custom'
import { cn } from '@/shared/utils'

import { useUpdateCard } from '../model/hooks/useUpdateCard'
import { EditableProps } from '../model/types/EditableProps'

export const EditableDescription = ({ cardId, boardId, t }: EditableProps) => {
	const { control, getValues } = useFormContext()

	const { isEditing, setIsEditing, handleBlur, isLoading } = useUpdateCard(
		cardId,
		boardId,
		'description'
	)

	return (
		<FormTextareaController
			name='description'
			control={control}
			label={t('description')}
			icon={
				<TextAlignJustify className='size-3.5 text-muted-foreground' />
			}
			placeholder={t('editDescription')}
			disabled={isLoading}
			readOnly={!isEditing}
			autoFocus={isEditing}
			className={cn(
				'whitespace-pre-wrap',
				!isEditing &&
					'cursor-pointer border-transparent bg-muted/30 shadow-none hover:border-input/60 hover:bg-muted/40 focus-visible:ring-0'
			)}
			onClick={() => {
				if (!isEditing) setIsEditing(true)
			}}
			onFocus={() => {
				if (!isEditing) setIsEditing(true)
			}}
			onBlur={() => {
				if (isEditing) handleBlur(getValues('description'))
			}}
		/>
	)
}
