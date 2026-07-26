'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'

import { boardKeys } from '@/entities/Board'

import { useQueryApiError } from '@/shared/hooks/useQueryApiError'
import { ActionResponse } from '@/shared/types'
import { handleApiError } from '@/shared/utils'

import {
	acceptInvite,
	createInvite,
	declineInvite,
	getInviteData,
	inviteUser,
	searchInviteUsers
} from '../api/inviteApi'
import { CreateInviteResponse, GetInviteResponse } from '../types/InviteProps'

export const inviteKeys = {
	getInviteData: (token?: string) => ['get-invite-data', token],
	createInvite: ['create-invite'],
	inviteUser: ['invite-user'],
	acceptInvite: ['accept-invite'],
	declineInvite: ['decline-invite']
}

export const useGetInviteData = (token?: string) => {
	const {
		data: inviteData,
		isPending: inviteDataPending,
		isError: inviteDataIsError,
		error: inviteDataError
	} = useQuery<GetInviteResponse, AxiosError>({
		queryKey: inviteKeys.getInviteData(token),
		queryFn: () => getInviteData(token as string),
		enabled: Boolean(token)
	})

	return {
		inviteData,
		inviteDataPending,
		inviteDataIsError,
		inviteDataError
	}
}

export const useCreateInvite = () => {
	const t = useTranslations()

	const {
		data: createInviteData,
		mutate: createInviteToBoard,
		isPending: createPending
	} = useMutation<CreateInviteResponse, AxiosError, string>({
		mutationKey: inviteKeys.createInvite,
		mutationFn: createInvite,
		onError: err => handleApiError(err, t)
	})

	return {
		createInviteData,
		createInviteToBoard,
		createPending
	}
}

export const useInviteUser = () => {
	const t = useTranslations()

	const { mutate: inviteUserToBoard, isPending: inviteUserPending } =
		useMutation<
			ActionResponse,
			AxiosError,
			{ boardId: string; userId: string }
		>({
			mutationKey: inviteKeys.inviteUser,
			mutationFn: inviteUser,
			onError: err => handleApiError(err, t)
		})

	return {
		inviteUserToBoard,
		inviteUserPending
	}
}

export const useAcceptInviteToBoard = () => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const {
		mutate: acceptInviteToBoard,
		isPending: acceptPending,
		isError: acceptError
	} = useMutation<ActionResponse, AxiosError, string>({
		mutationKey: inviteKeys.acceptInvite,
		mutationFn: acceptInvite,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: boardKeys.all })
		},
		onError: err => handleApiError(err, t)
	})

	return {
		acceptInviteToBoard,
		acceptPending,
		acceptError
	}
}

export const useDeclineInviteToBoard = () => {
	const t = useTranslations()

	const {
		mutate: declineInviteToBoard,
		isPending: declinePending,
		isError: declineError
	} = useMutation<ActionResponse, AxiosError, string>({
		mutationKey: inviteKeys.declineInvite,
		mutationFn: declineInvite,
		onError: err => handleApiError(err, t)
	})

	return {
		declineInviteToBoard,
		declinePending,
		declineError
	}
}

export const useInviteUserBySearch = ({
	boardId,
	debouncedQuery
}: {
	boardId: string
	debouncedQuery: string
}) => {
	const query = useQuery({
		queryKey: ['invite-user-search', boardId, debouncedQuery],
		queryFn: () => searchInviteUsers(boardId, debouncedQuery),
		enabled: debouncedQuery.trim().length >= 2
	})

	useQueryApiError(query.error, query.isError)

	return {
		data: query.data,
		isFetching: query.isFetching
	}
}
