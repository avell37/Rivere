'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { boardKeys } from '@/entities/Board'

import { ActionResponse } from '@/shared/types'
import { handleApiError } from '@/shared/utils'

import {
	createCardApi,
	deleteCardApi,
	fetchArchivedCardsApi,
	permanentDeleteCardApi,
	restoreCardApi,
	updateCardApi
} from '../api/cardApi'
import { UpdateCardPayload } from '../types/CardPayloads'
import { ToggleDoneProps } from '../types/CardProps'
import { IArchivedCard } from '../types/IArchivedCard'
import { ICard } from '../types/ICard'
import { CreateCardRequest } from '../validation/create-card.z.validation'

export const cardKeys = {
	create: ['create-card'],
	update: (cardId: string) => ['update-card', cardId],
	delete: ['delete-card'],
	archived: (boardId: string) => ['archived-cards', boardId],
	restore: (cardId: string) => ['restore-card', cardId],
	permanentDelete: (cardId: string) => ['permanent-delete-card', cardId],
	toggleDone: (cardId: string) => ['toggle-card-done', cardId]
}

export const useCreateCardMutation = ({
	columnId,
	boardId
}: {
	columnId: string
	boardId: string
}) => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const { mutate: createCard, isPending: createCardPending } = useMutation<
		ICard,
		AxiosError,
		CreateCardRequest
	>({
		mutationKey: cardKeys.create,
		mutationFn: (data: CreateCardRequest) =>
			createCardApi({ columnId, ...data }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: boardKeys.single(boardId)
			})
		},
		onError: err => handleApiError(err, t)
	})

	return {
		createCard,
		createCardPending
	}
}

export const useUpdateCardMutation = (cardId: string, boardId: string) => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const { mutate: updateCard, isPending: updateCardPending } = useMutation<
		ICard,
		AxiosError,
		UpdateCardPayload
	>({
		mutationKey: cardKeys.update(cardId),
		mutationFn: data => updateCardApi(cardId, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: boardKeys.single(boardId)
			})
		},
		onError: err => handleApiError(err, t)
	})

	return {
		updateCard,
		updateCardPending
	}
}

export const useDeleteCardMutation = (boardId: string) => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const { mutate: deleteCard, isPending: deleteCardPending } = useMutation<
		ActionResponse,
		AxiosError,
		string
	>({
		mutationKey: cardKeys.delete,
		mutationFn: deleteCardApi,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: boardKeys.single(boardId)
			})
			queryClient.invalidateQueries({
				queryKey: cardKeys.archived(boardId)
			})
		},
		onError: err => handleApiError(err, t)
	})

	return {
		deleteCard,
		deleteCardPending
	}
}

export const useGetArchivedCards = (boardId: string) => {
	const {
		data: archivedCards,
		isPending: archivedCardsPending
	} = useQuery<IArchivedCard[], AxiosError>({
		queryKey: cardKeys.archived(boardId),
		queryFn: () => fetchArchivedCardsApi(boardId),
		enabled: !!boardId
	})

	return {
		archivedCards: archivedCards ?? [],
		archivedCardsPending
	}
}

export const useRestoreCardMutation = (boardId: string) => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const { mutate: restoreCard, isPending: restoreCardPending } = useMutation<
		ICard,
		AxiosError,
		string
	>({
		mutationKey: cardKeys.restore(''),
		mutationFn: restoreCardApi,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: boardKeys.single(boardId)
			})
			queryClient.invalidateQueries({
				queryKey: cardKeys.archived(boardId)
			})
		},
		onError: err => handleApiError(err, t)
	})

	return {
		restoreCard,
		restoreCardPending
	}
}

export const usePermanentDeleteCardMutation = (boardId: string) => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const {
		mutate: permanentDeleteCard,
		isPending: permanentDeleteCardPending
	} = useMutation<ActionResponse, AxiosError, string>({
		mutationKey: cardKeys.permanentDelete(''),
		mutationFn: permanentDeleteCardApi,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: cardKeys.archived(boardId)
			})
		},
		onError: err => handleApiError(err, t)
	})

	return {
		permanentDeleteCard,
		permanentDeleteCardPending
	}
}

export const useToggleDoneMutation = ({ cardId, boardId }: ToggleDoneProps) => {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const { mutate, isPending: togglePending } = useMutation<
		ICard,
		AxiosError,
		boolean
	>({
		mutationKey: cardKeys.toggleDone(cardId),
		mutationFn: done => updateCardApi(cardId, { done }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: boardKeys.single(boardId)
			})
			toast.success(t('card.doneSuccess'))
		},
		onError: err => handleApiError(err, t)
	})

	const toggleDone = (e: React.MouseEvent, currentDone: boolean) => {
		e.stopPropagation()
		mutate(!currentDone)
	}

	return {
		toggleDone,
		togglePending
	}
}
