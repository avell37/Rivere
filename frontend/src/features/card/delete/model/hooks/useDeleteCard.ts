'use client'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { useDeleteCardMutation } from '@/entities/Card'

import { DeleteCardProps } from '../types/DeleteCardProps'

export const useDeleteCard = ({ cardId, boardId }: DeleteCardProps) => {
	const t = useTranslations()

	const { deleteCard, deleteCardPending } = useDeleteCardMutation(boardId)

	const onSubmit = () =>
		deleteCard(cardId, {
			onSuccess: () => {
				toast.success(t('card.delete.deleteSuccess'))
			}
		})

	return {
		onSubmit,
		deleteCardPending
	}
}
