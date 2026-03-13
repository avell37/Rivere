'use client'
import { useTranslations } from 'next-intl'

import { Modal } from '@/shared/ui/custom'

import { useEditBoard } from '../model/hooks/useEditBoard'

import { EditBoardForm } from './EditBoardForm'

interface EditBoardModalProps {
	open: boolean
	onOpenChange: (open: boolean) => void
	boardId: string
}

export const EditBoardModal = ({
	open,
	onOpenChange,
	boardId
}: EditBoardModalProps) => {
	const t = useTranslations('board.edit')

	const { form, onSubmit } = useEditBoard({
		boardId,
		onSuccess: onOpenChange
	})

	return (
		<Modal
			open={open}
			onOpenChange={onOpenChange}
			title={t('editTitle')}
			description={t('editDescription')}
			contentClassname='sm:max-w-md'
		>
			<EditBoardForm form={form} onSubmit={onSubmit} t={t} />
		</Modal>
	)
}
