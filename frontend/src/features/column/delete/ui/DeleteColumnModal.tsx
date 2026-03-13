'use client'
import { useTranslations } from 'next-intl'

import { IBoardColumnIdentifiers } from '@/shared/types/IBoardColumnIdentifiers'
import { Alert } from '@/shared/ui/custom'

import { useDeleteColumn } from '../model/hooks/useDeleteColumn'

interface DeleteColumnModalProps extends IBoardColumnIdentifiers {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export const DeleteColumnModal = ({
	columnId,
	boardId,
	open,
	onOpenChange
}: DeleteColumnModalProps) => {
	const { onSubmit } = useDeleteColumn({ columnId, boardId })
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
		/>
	)
}
