'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { boardKeys } from '@/entities/Board'

import { handleApiError } from '@/shared/utils'

import {
	fetchMoveCardToColumn,
	fetchReorderCards,
	fetchReorderColumns
} from '../api/reorderApi'
import { ReorderColumns } from '../types/ReorderPayload'

export const dndKeys = {
	reorderCards: ['reorder-cards'],
	moveCards: ['move-cards'],
	reorderColumns: (boardId: string) => ['reorder-columns', boardId]
}

export const useReorderCardsMutation = () => {
	const t = useTranslations()

	const { mutate: reorderCards, isPending: reorderCardsPending } =
		useMutation({
			mutationKey: dndKeys.reorderCards,
			mutationFn: fetchReorderCards,
			onError: err => handleApiError(err, t)
		})

	return {
		reorderCards,
		reorderCardsPending
	}
}

export const useMoveCardsMutation = () => {
	const t = useTranslations()

	const { mutate: moveCards, isPending: moveCardsPending } = useMutation({
		mutationKey: dndKeys.moveCards,
		mutationFn: fetchMoveCardToColumn,
		onError: err => handleApiError(err, t)
	})

	return {
		moveCards,
		moveCardsPending
	}
}

export const useReorderColumnsMutation = (boardId: string) => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const { mutate: reorderColumns, isPending: reorderColumnsPending } =
		useMutation({
			mutationKey: dndKeys.reorderColumns(boardId),
			mutationFn: ({ boardId, columns }: ReorderColumns) =>
				fetchReorderColumns({ boardId, columns }),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: boardKeys.single(boardId)
				})
			},
			onError: err => handleApiError(err, t)
		})

	return {
		reorderColumns,
		reorderColumnsPending
	}
}
