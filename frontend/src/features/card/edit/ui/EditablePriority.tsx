import { useFormContext } from 'react-hook-form'

import { FormSelectController } from '@/shared/ui/custom'

import { useUpdateCard } from '../model/hooks/useUpdateCard'

export const EditablePriority = ({ cardId }: { cardId: string }) => {
	const { control } = useFormContext()
	const { handleBlur } = useUpdateCard(cardId, 'priority')

	return (
		<FormSelectController
			name='priority'
			label='Приоритет задачи'
			control={control}
			onChange={value => handleBlur(value)}
		/>
	)
}
