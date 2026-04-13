'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { boardKeys } from '@/entities/Board'
import {
	EditColumnRequest,
	EditColumnSchema,
	IColumn,
	updateColumn
} from '@/entities/Column'

import { handleApiError } from '@/shared/utils'

import { EditColumnProps } from '../types/EditColumnProps'

export const useEditColumn = ({
	columnId,
	boardId,
	onSuccess
}: EditColumnProps) => {
	const queryClient = useQueryClient()
	const t = useTranslations()
	const form = useForm<EditColumnRequest>({
		resolver: zodResolver(EditColumnSchema),
		defaultValues: {
			title: ''
		}
	})

	const { mutate } = useMutation<IColumn, unknown, EditColumnRequest>({
		mutationKey: ['update column'],
		mutationFn: (data: EditColumnRequest) =>
			updateColumn({ columnId, ...data }),
		onSuccess: () => {
			form.reset()
			queryClient.invalidateQueries({
				queryKey: boardKeys.single(boardId)
			})
			toast.success(t('column.edit.editSuccess'))
			onSuccess()
		},
		onError: err => handleApiError(err, t)
	})

	const onSubmit: SubmitHandler<EditColumnRequest> = data => mutate(data)

	return {
		form,
		onSubmit
	}
}
