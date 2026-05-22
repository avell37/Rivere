'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { MouseEvent } from 'react'
import { toast } from 'sonner'

import { ActionResponse } from '@/shared/types'
import { handleApiError } from '@/shared/utils'

import {
	createBoardApi,
	deleteBoardApi,
	fetchBoardById,
	fetchUserBoards,
	toggleFavoriteApi,
	updateBoardApi
} from '../api/boardApi'
import { IBoard } from '../types/IBoard'
import { CreateBoardRequest } from '../validation/create-board.z.validation'
import { EditBoardRequest } from '../validation/edit-board.z.validation'

export const boardKeys = {
	create: ['create-board'],
	all: ['get-boards'],
	single: (id: string) => ['get-board', id],
	update: (id: string) => ['update-board', id],
	delete: ['delete-board'],
	toggleFavorite: (id: string) => ['toggle-favorite', id]
}

export const useCreateBoardMutation = () => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const { mutate: createBoard, isPending: createBoardPending } = useMutation<
		IBoard,
		AxiosError,
		CreateBoardRequest
	>({
		mutationKey: boardKeys.create,
		mutationFn: createBoardApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: boardKeys.all })
		},
		onError: err => handleApiError(err, t)
	})

	return {
		createBoard,
		createBoardPending
	}
}

export const useGetBoard = (boardId: string) => {
	const {
		data: board,
		isLoading: boardPending,
		error: boardError
	} = useQuery<IBoard, AxiosError>({
		queryKey: boardKeys.single(boardId),
		queryFn: () => fetchBoardById(boardId),
		enabled: !!boardId,
		retry: false,
		staleTime: 1000
	})

	return {
		board,
		boardPending,
		boardError
	}
}

export const useGetBoards = () => {
	const {
		data: boards,
		isPending: boardsPending,
		isError
	} = useQuery<IBoard[], AxiosError>({
		queryKey: boardKeys.all,
		queryFn: fetchUserBoards
	})

	const favoriteBoards = boards?.filter(board => board.isFavorite)
	const otherBoards = boards?.filter(board => !board.isFavorite)

	return {
		favoriteBoards,
		otherBoards,
		boardsPending,
		isError
	}
}

export const useUpdateBoardMutation = (boardId: string) => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const { mutate: updateBoard, isPending: updateBoardPending } = useMutation<
		IBoard,
		AxiosError,
		EditBoardRequest
	>({
		mutationKey: boardKeys.update(boardId),
		mutationFn: (data: EditBoardRequest) =>
			updateBoardApi({ boardId, data }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: boardKeys.single(boardId)
			})
		},
		onError: err => handleApiError(err, t)
	})

	return {
		updateBoard,
		updateBoardPending
	}
}

export const useDeleteBoardMutation = () => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const { mutate: deleteBoard, isPending: deleteBoardPending } = useMutation<
		ActionResponse,
		AxiosError,
		string
	>({
		mutationKey: boardKeys.delete,
		mutationFn: deleteBoardApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: boardKeys.all })
		},
		onError: err => handleApiError(err, t)
	})

	return {
		deleteBoard,
		deleteBoardPending
	}
}

export const useToggleFavoriteMutation = (
	boardId: string,
	isFavorite: boolean | undefined
) => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const {
		mutate: toggleFavoriteBoard,
		isPending: toggleFavoritePending,
		isError
	} = useMutation<ActionResponse, AxiosError, { boardId: string }>({
		mutationKey: boardKeys.toggleFavorite(boardId),
		mutationFn: ({ boardId }) => toggleFavoriteApi(boardId),
		onSuccess: () => {
			const message = isFavorite
				? t('board.removedFromFavorites')
				: t('board.addedToFavorites')

			toast.success(message)

			queryClient.invalidateQueries({
				queryKey: boardKeys.all
			})
			queryClient.invalidateQueries({
				queryKey: boardKeys.single(boardId)
			})
		},
		onError: err => handleApiError(err, t)
	})

	const handleToggleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.stopPropagation()

		toggleFavoriteBoard({ boardId })
	}

	return {
		handleToggleFavorite,
		toggleFavoritePending,
		isError
	}
}
