import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import {
	getUserSessions,
	terminateAllExceptCurrent,
	terminateSession
} from '../api/sessionApi'

export const useSession = () => {
	const { data: userSessions, isPending: sessionsIsPending } = useQuery({
		queryKey: ['get user sessions'],
		queryFn: () => getUserSessions()
	})

	const {
		data: terminateSessionData,
		mutate: terminateSelectedSession,
		isPending: terminateIsPending
	} = useMutation({
		mutationKey: ['terminate session'],
		mutationFn: (sessionId: string) => terminateSession(sessionId),
		onSuccess: () => {
			toast.success('Сессия успешно завершена')
		}
	})

	const {
		data: terminateAllSessionsData,
		mutate: terminateAllSessions,
		isPending: terminateAllIsPending
	} = useMutation({
		mutationKey: ['terminate all sessions'],
		mutationFn: () => terminateAllExceptCurrent(),
		onSuccess: () => {
			toast.success('Все сессии, кроме текущей, успешно завершены')
		}
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
