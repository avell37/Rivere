import { Monitor, Smartphone } from 'lucide-react'

import { formatDate, formatTime } from '@/shared/utils'

import { ISession } from '../model/types/ISession'
import { SessionListProps } from '../model/types/SessionProps'

import { SessionItem } from './SessionItem'

export const SessionList = ({
	userSessions,
	locale,
	t,
	terminateSelectedSession
}: SessionListProps) => {
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
					date={t('lastActive', {
						date: formatDate(session.lastActiveAt, locale),
						time: formatTime(session.lastActiveAt, locale)
					})}
					isCurrent={session.isCurrent}
					onTerminate={() => terminateSelectedSession(session.id)}
				/>
			))}
		</div>
	)
}
