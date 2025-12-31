import { Monitor, Smartphone } from 'lucide-react'

import { useSession } from '../model/hooks/useSession'
import { ISession } from '../model/types/ISession'

import { SessionItem } from './SessionItem'

export const SessionList = () => {
	const { userSessions, sessionsIsPending, terminateSelectedSession } =
		useSession()

	if (sessionsIsPending) {
		return <p>Загрузка...</p>
	}

	return (
		<div className='flex flex-col gap-4'>
			{userSessions?.map((session: ISession) => (
				<SessionItem
					key={session.id}
					icon={
						session?.device?.includes('Desktop') ? (
							<Monitor />
						) : (
							<Smartphone />
						)
					}
					title={`${session.browser} | ${session.device}`}
					date={`Последняя активность: ${new Date(session.lastActiveAt).toLocaleString()}`}
					isCurrent={session.isCurrent}
					onTerminate={() => terminateSelectedSession(session.id)}
				/>
			))}
		</div>
	)
}
