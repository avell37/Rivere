'use client'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { useDeleteColumnMutation } from '@/entities/Column'

import { IBoardColumnIdentifiers } from '@/shared/types'

export const useDeleteColumn = ({
	columnId,
	boardId
}: IBoardColumnIdentifiers) => {
	const t = useTranslations()
	const { deleteColumn, deleteColumnPending } = useDeleteColumnMutation({
		boardId
	})

	const onSubmit = () =>
		deleteColumn(columnId, {
			onSuccess: () => {
				toast.success(t('column.delete.deleteSuccess'))
			}
		})

	return {
		onSubmit,
		deleteColumnPending
	}
}
