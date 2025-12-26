import { useRef } from 'react'
import { useFormContext } from 'react-hook-form'

import { FormDatePickerController } from '@/shared/ui/custom'

import { useUpdateCard } from '../model/hooks/useUpdateCard'

export const EditableDeadline = ({ cardId }: { cardId: string }) => {
	const { control } = useFormContext()

	const { handleChange } = useUpdateCard(cardId, 'deadline')

	return (
		<FormDatePickerController
			name='deadline'
			label='Выберите дедлайн'
			control={control}
			onChange={date => handleChange(date)}
		/>
	)
}
