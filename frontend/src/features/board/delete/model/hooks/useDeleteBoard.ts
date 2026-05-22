'use client'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { useDeleteBoardMutation } from '@/entities/Board'

import { PRIVATE_URL } from '@/shared/libs'

export const useDeleteBoard = (boardId: string) => {
	const router = useRouter()
	const t = useTranslations()
	const { deleteBoard, deleteBoardPending } = useDeleteBoardMutation()

	const onSubmit = () =>
		deleteBoard(boardId, {
			onSuccess: () => {
				router.push(PRIVATE_URL.boards())
				toast.success(t('board.delete.deleteSuccess'))
			}
		})

	return { onSubmit, deleteBoardPending }
}
