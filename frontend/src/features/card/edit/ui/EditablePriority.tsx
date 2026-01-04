import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { getPrioritySelectOptions } from '@/shared/libs/priorityConfig'
import { FormSelectController } from '@/shared/ui/custom'

import { useUpdateCard } from '../model/hooks/useUpdateCard'
import { EditableProps } from '../model/types/EditableProps'

export const EditablePriority = ({ cardId, t }: EditableProps) => {
	const { control } = useFormContext()
	const { handleBlur } = useUpdateCard(cardId, 'priority')
	const tPriority = useTranslations('priority')

	return (
		<FormSelectController
			name='priority'
			label={t('editPriorityLabel')}
			placeholder={t('editPriorityPlaceholder')}
			control={control}
			onChange={value => handleBlur(value)}
			options={getPrioritySelectOptions(tPriority)}
		/>
	)
}
