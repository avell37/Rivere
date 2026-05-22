'use client'
import {
	ISession,
	useGetUserSessions,
	useTerminateAllSessionsMutation,
	useTerminateSelectedSessionMutation
} from '@/entities/Session'

export const useSession = () => {
	const { userSessions, sessionsIsPending } = useGetUserSessions()
	const { terminateSession, terminatePending } =
		useTerminateSelectedSessionMutation()
	const { terminateAllExceptCurrent, terminateAllPending } =
		useTerminateAllSessionsMutation()

	const hasOtherSessions = userSessions?.some(
		(session: ISession) => !session.isCurrent
	)

	return {
		userSessions,
		hasOtherSessions,
		sessionsIsPending,
		terminatePending,
		terminateAllPending,
		terminateSession,
		terminateAllExceptCurrent
	}
}
