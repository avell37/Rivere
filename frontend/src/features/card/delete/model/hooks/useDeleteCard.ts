'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { ICard, deleteCard } from '@/entities/Card'

import { handleApiError } from '@/shared/utils'

import { DeleteCardProps } from '../types/DeleteCardProps'

export const useDeleteCard = ({ cardId, boardId }: DeleteCardProps) => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const { mutate } = useMutation<ICard, unknown>({
		mutationKey: ['delete card'],
		mutationFn: () => deleteCard(cardId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get board', boardId] })
			toast.success(t('card.delete.deleteSuccess'))
		},
		onError: err => handleApiError(err, t)
	})

	const onSubmit = () => mutate()

	return {
		onSubmit
	}
}
