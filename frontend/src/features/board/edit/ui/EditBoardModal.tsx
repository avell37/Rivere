'use client'
import { useTranslations } from 'next-intl'

import { Modal } from '@/shared/ui/custom'

import { useEditBoard } from '../model/hooks/useEditBoard'
import { EditBoardModalProps } from '../model/types/EditBoardProps'

import { EditBoardForm } from './EditBoardForm'

export const EditBoardModal = ({
	open,
	onOpenChange,
	boardId
}: EditBoardModalProps) => {
	const t = useTranslations('board.edit')

	const { form, updateBoardPending, onSubmit } = useEditBoard({
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
			<EditBoardForm
				form={form}
				isPending={updateBoardPending}
				onSubmit={onSubmit}
				t={t}
			/>
		</Modal>
	)
}
