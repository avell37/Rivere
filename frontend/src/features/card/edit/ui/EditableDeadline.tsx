import { useFormContext } from 'react-hook-form'

import { FormDatePickerController } from '@/shared/ui/custom'

import { useUpdateCard } from '../model/hooks/useUpdateCard'
import { EditableProps } from '../model/types/EditableProps'

export const EditableDeadline = ({ cardId, t }: EditableProps) => {
	const { control } = useFormContext()

	const { handleChange } = useUpdateCard(cardId, 'deadline')

	return (
		<FormDatePickerController
			name='deadline'
			label={t('editDeadlineLabel')}
			placeholder={t('editDeadlinePlaceholder')}
			control={control}
			onChange={date => handleChange(date)}
		/>
	)
}
