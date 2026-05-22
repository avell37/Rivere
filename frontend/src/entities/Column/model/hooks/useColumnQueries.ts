'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'

import { boardKeys } from '@/entities/Board'

import { ActionResponse } from '@/shared/types'
import { handleApiError } from '@/shared/utils'

import {
	createColumnApi,
	deleteColumnApi,
	updateColumnApi
} from '../api/columnApi'
import { IColumn } from '../types/IColumn'
import { CreateColumnRequest } from '../validation/create-column.z.validation'
import { EditColumnRequest } from '../validation/edit-column.z.validation'

export const columnKeys = {
	create: ['create-column'],
	update: (columnId: string) => ['update-column', columnId],
	delete: ['delete-column']
}

export const useCreateColumnMutation = (boardId: string) => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const { mutate: createColumn, isPending: createColumnPending } =
		useMutation<IColumn, AxiosError, CreateColumnRequest>({
			mutationKey: columnKeys.create,
			mutationFn: (data: CreateColumnRequest) =>
				createColumnApi({ boardId, ...data }),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: boardKeys.single(boardId)
				})
			},
			onError: err => handleApiError(err, t)
		})

	return {
		createColumn,
		createColumnPending
	}
}

export const useUpdateColumnMutation = ({
	columnId,
	boardId
}: {
	columnId: string
	boardId: string
}) => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const { mutate: updateColumn, isPending: updateColumnPending } =
		useMutation<IColumn, AxiosError, EditColumnRequest>({
			mutationKey: columnKeys.update(columnId),
			mutationFn: (data: EditColumnRequest) =>
				updateColumnApi({ columnId, ...data }),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: boardKeys.single(boardId)
				})
			},
			onError: err => handleApiError(err, t)
		})

	return {
		updateColumn,
		updateColumnPending
	}
}

export const useDeleteColumnMutation = ({ boardId }: { boardId: string }) => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const { mutate: deleteColumn, isPending: deleteColumnPending } =
		useMutation<ActionResponse, AxiosError, string>({
			mutationKey: columnKeys.delete,
			mutationFn: (columnId: string) => deleteColumnApi(columnId),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: boardKeys.single(boardId)
				})
			},
			onError: err => handleApiError(err, t)
		})

	return {
		deleteColumn,
		deleteColumnPending
	}
}
