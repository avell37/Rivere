import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { handleApiError } from '@/shared/utils'

import { updateCard } from '../api/cardApi'
import { ICard } from '../types/ICard'

interface useToggleDoneProps {
	cardId: string
	boardId: string
}

export const useToggleDone = ({ cardId, boardId }: useToggleDoneProps) => {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation<ICard, unknown, boolean>({
		mutationFn: done => updateCard(cardId, { done }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get board', boardId] })
			toast.success(t('card.doneSuccess'))
		},
		onError: err => handleApiError(err, t)
	})

	const toggleDone = (currentDone: boolean) => mutate(!currentDone)

	return {
		toggleDone,
		isPending
	}
}
