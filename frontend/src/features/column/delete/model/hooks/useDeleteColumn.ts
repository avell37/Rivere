import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteColumn } from '@/entities/Column/model/api/columnApi'

import { handleApiError } from '@/shared/utils/handleApiError'

export const useDeleteColumn = (columnId: string) => {
	const { mutate } = useMutation({
		mutationKey: ['delete column'],
		mutationFn: () => deleteColumn(columnId),
		onSuccess: () => {
			toast.success('Колонка успешно удалена.')
		},
		onError: handleApiError
	})

	const onSubmit = () => mutate()

	return {
		onSubmit
	}
}
