import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { handleApiError } from '@/shared/utils/handleApiError'

import { updateCard } from '../api/cardApi'

interface useToggleDoneProps {
	cardId: string
	boardId: string
}

export const useToggleDone = ({ cardId, boardId }: useToggleDoneProps) => {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationFn: (done: boolean) => updateCard(cardId, { done }),
		onSuccess: () => {
			toast.success('Успешно')
			queryClient.invalidateQueries({ queryKey: ['get board', boardId] })
		},
		onError: err => handleApiError(err, t)
	})

	const toggleDone = (currentDone: boolean) => mutate(!currentDone)

	return {
		toggleDone
	}
}
