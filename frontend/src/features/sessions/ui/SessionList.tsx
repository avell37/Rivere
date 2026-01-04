import { Monitor, Smartphone } from 'lucide-react'
import { useLocale } from 'next-intl'

import { formattedDate } from '@/shared/libs/formattedDate'

import { useSession } from '../model/hooks/useSession'
import { ISession } from '../model/types/ISession'

import { SessionItem } from './SessionItem'

export const SessionList = ({
	t
}: {
	t: (key: string, values?: Record<string, any>) => string
}) => {
	const { userSessions, sessionsIsPending, terminateSelectedSession } =
		useSession()
	const locale = useLocale()

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
					date={t('lastActive', {
						date: formattedDate(session.lastActiveAt, locale)
					})}
					isCurrent={session.isCurrent}
					onTerminate={() => terminateSelectedSession(session.id)}
				/>
			))}
		</div>
	)
}
