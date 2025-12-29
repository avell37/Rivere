import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteCard } from '@/entities/Card/model/api/cardApi'

import { handleApiError } from '@/shared/utils/handleApiError'

export const useDeleteCard = (cardId: string) => {
	const { mutate } = useMutation({
		mutationKey: ['delete card'],
		mutationFn: () => deleteCard(cardId),
		onSuccess: () => {
			toast.success('Карточка успешно удалена.')
		},
		onError: handleApiError
	})

	const onSubmit = () => mutate()

	return {
		onSubmit
	}
}
