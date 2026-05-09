import { Laptop, Smartphone } from 'lucide-react'

import { formatDate, formatTime, makeCapitalLetter } from '@/shared/utils'

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
		<div className='flex flex-col gap-2'>
			{userSessions?.map((session: ISession) => {
				const date = session?.lastActiveAt
					? formatDate(session.lastActiveAt, locale)
					: ''

				const time = session?.lastActiveAt
					? formatTime(session.lastActiveAt, locale)
					: ''

				return (
					<SessionItem
						key={session.id}
						icon={
							<div className='bg-linear-to-br from-gray-700 to-gray-300 p-2 rounded-lg'>
								{session?.metadata.device?.type?.includes(
									'desktop'
								) ? (
									<Laptop className='text-white' />
								) : (
									<Smartphone className='text-white' />
								)}
							</div>
						}
						title={`${t('browser')} · ${session?.metadata?.device?.browser}`}
						description={`${makeCapitalLetter(session?.metadata?.device?.type)} · ${session?.metadata?.device?.os} · ${t(
							'lastActive',
							{ date, time }
						)}`}
						span={`${session?.metadata?.location?.country} · ${session?.metadata?.location?.city} · ${session?.metadata?.ip}`}
						isCurrent={session?.isCurrent}
						currentSession={t('currentSession')}
						onTerminate={() => terminateSelectedSession(session.id)}
					/>
				)
			})}
		</div>
	)
}
