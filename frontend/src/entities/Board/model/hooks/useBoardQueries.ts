'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { handleApiError } from '@/shared/utils'

import {
	deleteMember,
	fetchBoardById,
	fetchUserBoards,
	toggleFavorite
} from '../api/boardApi'
import { IBoard } from '../types/IBoard'

export const boardKeys = {
	all: ['get-boards'],
	single: (id: string) => ['get-board', id],
	deleteMember: ['delete-member'],
	toggleFavorite: (id: string) => ['toggle-favorite', id]
}

export const useGetBoard = (boardId: string) => {
	const {
		data: board,
		isLoading,
		error
	} = useQuery<IBoard, AxiosError>({
		queryKey: boardKeys.single(boardId),
		queryFn: () => fetchBoardById(boardId),
		enabled: !!boardId,
		retry: false,
		staleTime: 1000
	})

	return {
		board,
		isLoading,
		error
	}
}

export const useGetBoards = () => {
	const { data: boards, isPending } = useQuery<IBoard[], unknown>({
		queryKey: boardKeys.all,
		queryFn: fetchUserBoards
	})

	const favoriteBoards = boards?.filter(board => board.isFavorite)
	const otherBoards = boards?.filter(board => !board.isFavorite)

	return {
		favoriteBoards,
		otherBoards,
		isPending
	}
}

export const useDeleteMember = (boardId: string) => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const { mutate, isPending } = useMutation<boolean, unknown, string>({
		mutationKey: boardKeys.deleteMember,
		mutationFn: (userId: string) => deleteMember(boardId, userId),
		onSuccess: () => {
			toast.success(t('board.deleteMember'))
			queryClient.invalidateQueries({
				queryKey: boardKeys.single(boardId)
			})
		},
		onError: err => handleApiError(err, t)
	})

	return {
		isPending,
		mutate
	}
}

export const useToggleFavorite = (
	boardId: string,
	isFavorite: boolean | undefined
) => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const { mutate, isPending } = useMutation({
		mutationKey: boardKeys.toggleFavorite(boardId),
		mutationFn: () => toggleFavorite(boardId),
		onSuccess: () => {
			if (isFavorite) {
				toast.success(t('board.removedFromFavorites'))
			} else {
				toast.success(t('board.addedToFavorites'))
			}
			queryClient.invalidateQueries({
				queryKey: boardKeys.all
			})
			queryClient.invalidateQueries({
				queryKey: boardKeys.single(boardId)
			})
		},
		onError: err => handleApiError(err, t)
	})

	return {
		isPending,
		mutate
	}
}
