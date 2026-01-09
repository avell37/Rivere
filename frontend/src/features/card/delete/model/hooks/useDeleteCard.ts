import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { deleteCard } from '@/entities/Card/model/api/cardApi'

import { handleApiError } from '@/shared/utils/handleApiError'

export const useDeleteCard = (cardId: string) => {
	const t = useTranslations()
	const { mutate } = useMutation({
		mutationKey: ['delete card'],
		mutationFn: () => deleteCard(cardId),
		onSuccess: () => {
			toast.success('Карточка успешно удалена.')
		},
		onError: err => handleApiError(err, t)
	})

	const onSubmit = () => mutate()

	return {
		onSubmit
	}
}
