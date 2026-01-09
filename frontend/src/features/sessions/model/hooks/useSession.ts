import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { handleApiError } from '@/shared/utils/handleApiError'

import {
	getUserSessions,
	terminateAllExceptCurrent,
	terminateSession
} from '../api/sessionApi'
import { ISession } from '../types/ISession'

export const useSession = () => {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const { data: userSessions, isPending: sessionsIsPending } = useQuery<
		ISession[]
	>({
		queryKey: ['get user sessions'],
		queryFn: () => getUserSessions()
	})

	const { mutate: terminateSelectedSession, isPending: terminateIsPending } =
		useMutation({
			mutationKey: ['terminate session'],
			mutationFn: (sessionId: string) => terminateSession(sessionId),
			onSuccess: () => {
				toast.success('Сессия успешно завершена')
				queryClient.invalidateQueries({
					queryKey: ['get user sessions']
				})
			},
			onError: err => handleApiError(err, t)
		})

	const { mutate: terminateAllSessions, isPending: terminateAllIsPending } =
		useMutation({
			mutationKey: ['terminate all sessions'],
			mutationFn: () => terminateAllExceptCurrent(),
			onSuccess: () => {
				toast.success('Все сессии, кроме текущей, успешно завершены')
				queryClient.invalidateQueries({
					queryKey: ['get user sessions']
				})
			},
			onError: err => handleApiError(err, t)
		})

	return {
		userSessions,
		sessionsIsPending,
		terminateIsPending,
		terminateAllIsPending,
		terminateSelectedSession,
		terminateAllSessions
	}
}
