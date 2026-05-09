'use client'
import { useTranslations } from 'next-intl'

import { Alert } from '@/shared/ui/custom'

import { useDeleteBoard } from '../model/hooks/useDeleteBoard'

interface DeleteBoardModalProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	boardId: string
}

export const DeleteBoardModal = ({
	open,
	boardId,
	onOpenChange
}: DeleteBoardModalProps) => {
	const { onSubmit, isPending } = useDeleteBoard(boardId)
	const t = useTranslations('board.delete')

	return (
		<Alert
			open={open}
			onOpenChange={onOpenChange}
			title={t('deleteTitle')}
			description={t('deleteDescription')}
			actionText={t('deleteActionText')}
			cancelText={t('deleteCancelText')}
			onSubmit={onSubmit}
			isPending={isPending}
		/>
	)
}
