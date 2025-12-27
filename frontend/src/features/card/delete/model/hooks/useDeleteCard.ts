import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteCard } from '@/entities/Card/model/api/cardApi'

export const useDeleteCard = (cardId: string) => {
	const { mutate } = useMutation({
		mutationKey: ['delete card'],
		mutationFn: () => deleteCard(cardId),
		onSuccess: () => {
			toast.success('Карточка успешно удалена.')
		},
		onError(err) {
			if (err.message) toast.error(err.message)
			else toast.error('Ошибка при удалении карточки.')
		}
	})

	const onSubmit = () => mutate()

	return {
		onSubmit
	}
}
