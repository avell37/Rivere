'use client'
import { CircleDashed } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { getPrioritySelectOptions } from '@/shared/config'
import { FormSelectController } from '@/shared/ui/custom'

import { useUpdateCard } from '../model/hooks/useUpdateCard'
import { EditableProps } from '../model/types/EditableProps'

export const EditablePriority = ({
	cardId,
	boardId,
	t,
	className
}: EditableProps) => {
	const { control } = useFormContext()
	const { handleBlur, isLoading } = useUpdateCard(
		cardId,
		boardId,
		'priority'
	)
	const tPriority = useTranslations('priority')

	return (
		<div>
			<FormSelectController
				name='priority'
				icon={<CircleDashed size={14} />}
				label={t('editPriorityLabel')}
				placeholder={t('editPriorityPlaceholder')}
				className={className ? className : 'w-48'}
				control={control}
				onChange={value => handleBlur(value)}
				options={getPrioritySelectOptions(tPriority)}
				disabled={isLoading}
			/>
		</div>
	)
}
