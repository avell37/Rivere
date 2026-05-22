'use client'
import { useTranslations } from 'next-intl'

import { Modal } from '@/shared/ui/custom'

import { useEditColumn } from '../model/hooks/useEditColumn'
import { EditColumnModalProps } from '../model/types/EditColumnProps'

import { EditColumnForm } from './EditColumnForm'

export const EditColumnModal = ({
	open,
	onOpenChange,
	columnId,
	boardId
}: EditColumnModalProps) => {
	const { form, updateColumnPending, onSubmit } = useEditColumn({
		columnId,
		boardId,
		onSuccess: () => onOpenChange(false)
	})
	const t = useTranslations('column.edit')

	return (
		<Modal
			open={open}
			onOpenChange={onOpenChange}
			title={t('editTitle')}
			description={t('editDescription')}
			contentClassname='sm:max-w-md'
		>
			<EditColumnForm
				form={form}
				isPending={updateColumnPending}
				onSubmit={onSubmit}
				t={t}
			/>
		</Modal>
	)
}
