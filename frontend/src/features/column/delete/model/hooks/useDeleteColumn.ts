import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { deleteColumn } from '@/entities/Column/model/api/columnApi'

import { handleApiError } from '@/shared/utils/handleApiError'

export const useDeleteColumn = (columnId: string) => {
	const t = useTranslations()
	const { mutate } = useMutation({
		mutationKey: ['delete column'],
		mutationFn: () => deleteColumn(columnId),
		onSuccess: () => {
			toast.success('Колонка успешно удалена.')
		},
		onError: err => handleApiError(err, t)
	})

	const onSubmit = () => mutate()

	return {
		onSubmit
	}
}
