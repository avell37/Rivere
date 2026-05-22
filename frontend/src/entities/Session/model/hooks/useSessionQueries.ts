'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { ActionResponse } from '@/shared/types'
import { handleApiError } from '@/shared/utils'

import {
	getUserSessions,
	terminateAllExceptCurrentApi,
	terminateSessionApi
} from '../api/sessionApi'
import { ISession } from '../types/ISession'

export const sessionKeys = {
	all: ['get-user-sessions'],
	terminate: ['terminate-session'],
	terminateAll: ['terminate-all-sessions']
}

export const useGetUserSessions = () => {
	const { data: userSessions, isPending: sessionsIsPending } = useQuery<
		ISession[],
		AxiosError
	>({
		queryKey: sessionKeys.all,
		queryFn: getUserSessions
	})

	return {
		userSessions,
		sessionsIsPending
	}
}

export const useTerminateSelectedSessionMutation = () => {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const { mutate: terminateSession, isPending: terminatePending } =
		useMutation<ActionResponse, AxiosError, string>({
			mutationKey: sessionKeys.terminate,
			mutationFn: (sessionId: string) => terminateSessionApi(sessionId),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: sessionKeys.all
				})
				toast.success(t('session.ended'))
			},
			onError: err => handleApiError(err, t)
		})

	return {
		terminateSession,
		terminatePending
	}
}

export const useTerminateAllSessionsMutation = () => {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const {
		mutate: terminateAllExceptCurrent,
		isPending: terminateAllPending
	} = useMutation<ActionResponse, AxiosError>({
		mutationKey: sessionKeys.terminateAll,
		mutationFn: terminateAllExceptCurrentApi,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: sessionKeys.all
			})
			toast.success(t('session.allEnded'))
		},
		onError: err => handleApiError(err, t)
	})

	return {
		terminateAllExceptCurrent,
		terminateAllPending
	}
}
