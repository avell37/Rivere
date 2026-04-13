'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { boardKeys } from '@/entities/Board'
import { IColumn, deleteColumn } from '@/entities/Column'

import { IBoardColumnIdentifiers } from '@/shared/types/IBoardColumnIdentifiers'
import { handleApiError } from '@/shared/utils'

export const useDeleteColumn = ({
	columnId,
	boardId
}: IBoardColumnIdentifiers) => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const { mutate } = useMutation<IColumn, unknown>({
		mutationKey: ['delete column'],
		mutationFn: () => deleteColumn(columnId),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: boardKeys.single(boardId)
			})
			toast.success(t('column.delete.deleteSuccess'))
		},
		onError: err => handleApiError(err, t)
	})

	const onSubmit = () => mutate()

	return {
		onSubmit
	}
}
