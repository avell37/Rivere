'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import {
	ISession,
	ISessionActionsResponse,
	getUserSessions,
	terminateAllExceptCurrent,
	terminateSession
} from '@/entities/Session'

import { handleApiError } from '@/shared/utils'

export const useSession = () => {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const { data: userSessions, isPending: sessionsIsPending } = useQuery<
		ISession[],
		unknown
	>({
		queryKey: ['get user sessions'],
		queryFn: () => getUserSessions()
	})

	const { mutate: terminateSelectedSession, isPending: terminateIsPending } =
		useMutation<ISessionActionsResponse, unknown, string>({
			mutationKey: ['terminate session'],
			mutationFn: (sessionId: string) => terminateSession(sessionId),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ['get user sessions']
				})
				toast.success(t('session.ended'))
			},
			onError: err => handleApiError(err, t)
		})

	const { mutate: terminateAllSessions, isPending: terminateAllIsPending } =
		useMutation<ISessionActionsResponse, unknown>({
			mutationKey: ['terminate all sessions'],
			mutationFn: () => terminateAllExceptCurrent(),
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: ['get user sessions']
				})
				toast.success(t('session.allEnded'))
			},
			onError: err => handleApiError(err, t)
		})

	const hasOtherSessions = userSessions?.some(
		(session: ISession) => !session.isCurrent
	)

	return {
		userSessions,
		hasOtherSessions,
		sessionsIsPending,
		terminateIsPending,
		terminateAllIsPending,
		terminateSelectedSession,
		terminateAllSessions
	}
}
