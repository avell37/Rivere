'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'

import { boardKeys } from '@/entities/Board'

import { ActionResponse } from '@/shared/types'
import { handleApiError } from '@/shared/utils'

import {
	createColumnApi,
	deleteColumnApi,
	fetchArchivedColumnsApi,
	permanentDeleteColumnApi,
	restoreColumnApi,
	updateColumnApi
} from '../api/columnApi'
import { IArchivedColumn } from '../types/IArchivedColumn'
import { IColumn } from '../types/IColumn'
import { CreateColumnRequest } from '../validation/create-column.z.validation'
import { EditColumnRequest } from '../validation/edit-column.z.validation'

export const columnKeys = {
	create: ['create-column'],
	update: (columnId: string) => ['update-column', columnId],
	delete: ['delete-column'],
	archived: (boardId: string) => ['archived-columns', boardId],
	restore: (columnId: string) => ['restore-column', columnId],
	permanentDelete: (columnId: string) => ['permanent-delete-column', columnId]
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
				queryClient.invalidateQueries({
					queryKey: columnKeys.archived(boardId)
				})
			},
			onError: err => handleApiError(err, t)
		})

	return {
		deleteColumn,
		deleteColumnPending
	}
}

export const useGetArchivedColumns = (boardId: string) => {
	const {
		data: archivedColumns,
		isPending: archivedColumnsPending
	} = useQuery<IArchivedColumn[], AxiosError>({
		queryKey: columnKeys.archived(boardId),
		queryFn: () => fetchArchivedColumnsApi(boardId),
		enabled: !!boardId
	})

	return {
		archivedColumns: archivedColumns ?? [],
		archivedColumnsPending
	}
}

export const useRestoreColumnMutation = (boardId: string) => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const { mutate: restoreColumn, isPending: restoreColumnPending } =
		useMutation<IColumn, AxiosError, string>({
			mutationKey: columnKeys.restore(''),
			mutationFn: restoreColumnApi,
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: boardKeys.single(boardId)
				})
				queryClient.invalidateQueries({
					queryKey: columnKeys.archived(boardId)
				})
			},
			onError: err => handleApiError(err, t)
		})

	return {
		restoreColumn,
		restoreColumnPending
	}
}

export const usePermanentDeleteColumnMutation = (boardId: string) => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const {
		mutate: permanentDeleteColumn,
		isPending: permanentDeleteColumnPending
	} = useMutation<ActionResponse, AxiosError, string>({
		mutationKey: columnKeys.permanentDelete(''),
		mutationFn: permanentDeleteColumnApi,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: columnKeys.archived(boardId)
			})
		},
		onError: err => handleApiError(err, t)
	})

	return {
		permanentDeleteColumn,
		permanentDeleteColumnPending
	}
}
