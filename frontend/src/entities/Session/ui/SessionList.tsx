import { Laptop, Smartphone } from 'lucide-react'

import { EmptyState } from '@/shared/ui/custom'
import { formatDate, formatDateTime, formatTime, makeCapitalLetter } from '@/shared/utils'

import { ISession } from '../model/types/ISession'
import { SessionListProps } from '../model/types/SessionProps'

import { SessionItem } from './SessionItem'

export const SessionList = ({
	userSessions,
	locale,
	t,
	terminateSelectedSession
}: SessionListProps) => {
	if (!userSessions?.length) {
		return <EmptyState centered>{t('empty')}</EmptyState>
	}

	return (
		<div className='flex flex-col gap-2'>
			{userSessions.map((session: ISession) => {
				const lastActiveDate = session.lastActiveAt
					? formatDate(session.lastActiveAt, locale)
					: ''
				const lastActiveTime = session.lastActiveAt
					? formatTime(session.lastActiveAt, locale)
					: ''
				const createdAt = session.createdAt
					? formatDateTime(session.createdAt, locale)
					: ''
				const deviceType = session.metadata.device?.type ?? 'desktop'
				const isDesktop = deviceType.includes('desktop')

				return (
					<SessionItem
						key={session.id}
						icon={
							<div className='rounded-lg bg-linear-to-br from-gray-700 to-gray-300 p-2'>
								{isDesktop ? (
									<Laptop className='text-white' />
								) : (
									<Smartphone className='text-white' />
								)}
							</div>
						}
						title={`${session.metadata.device?.browser ?? t('unknownBrowser')} · ${session.metadata.device?.os ?? t('unknownOs')}`}
						description={`${makeCapitalLetter(deviceType)} · ${t('lastActive', {
							date: lastActiveDate,
							time: lastActiveTime
						})}`}
						span={`${t('createdAt', { date: createdAt })} · ${session.metadata.location?.country ?? '—'} · ${session.metadata.location?.city ?? '—'} · ${session.metadata.ip}`}
						badge={
							session.rememberMe ? t('rememberedDevice') : undefined
						}
						isCurrent={session.isCurrent}
						currentSession={t('currentSession')}
						onTerminate={() => terminateSelectedSession(session.id)}
					/>
				)
			})}
		</div>
	)
}
