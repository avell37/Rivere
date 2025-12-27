import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteColumn } from '@/entities/Column/model/api/columnApi'

export const useDeleteColumn = (columnId: string) => {
	const { mutate } = useMutation({
		mutationKey: ['delete column'],
		mutationFn: () => deleteColumn(columnId),
		onSuccess: () => {
			toast.success('Колонка успешно удалена.')
		},
		onError(err) {
			if (err.message) toast.error(err.message)
			else toast.error('Ошибка при удалении колонки.')
		}
	})

	const onSubmit = () => mutate()

	return {
		onSubmit
	}
}
