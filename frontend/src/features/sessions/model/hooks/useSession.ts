import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { handleApiError } from '@/shared/utils/handleApiError'

import {
	getUserSessions,
	terminateAllExceptCurrent,
	terminateSession
} from '../api/sessionApi'

export const useSession = () => {
	const queryClient = useQueryClient()
	const { data: userSessions, isPending: sessionsIsPending } = useQuery({
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
			onError: handleApiError
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
			onError: handleApiError
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
