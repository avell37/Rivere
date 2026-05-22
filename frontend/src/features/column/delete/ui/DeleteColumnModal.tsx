'use client'
import { useTranslations } from 'next-intl'

import { Alert } from '@/shared/ui/custom'

import { useDeleteColumn } from '../model/hooks/useDeleteColumn'
import { DeleteColumnModalProps } from '../model/types/DeleteColumnProps'

export const DeleteColumnModal = ({
	columnId,
	boardId,
	open,
	onOpenChange
}: DeleteColumnModalProps) => {
	const { onSubmit, deleteColumnPending } = useDeleteColumn({
		columnId,
		boardId
	})
	const t = useTranslations('column.delete')

	return (
		<Alert
			open={open}
			onOpenChange={onOpenChange}
			title={t('deleteTitle')}
			description={t('deleteDescription')}
			actionText={t('deleteActionText')}
			cancelText={t('deleteCancelText')}
			onSubmit={onSubmit}
			isPending={deleteColumnPending}
		/>
	)
}
