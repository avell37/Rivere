import { useTranslations } from 'next-intl'

import { Alert } from '@/shared/ui/custom'
import { Button, Separator } from '@/shared/ui/external'

import { useSession } from '../model/hooks/useSession'
import { ISession } from '../model/types/ISession'

import { SessionList } from './SessionList'

export const Sessions = () => {
	const { userSessions, terminateAllSessions } = useSession()
	const t = useTranslations('profile.settings.session')
	const hasOtherSessions = userSessions?.some(
		(session: ISession) => !session.isCurrent
	)

	return (
		<div className='flex flex-col gap-6 w-full'>
			<Separator />
			<div className='flex justify-between'>
				<h3 className='text-2xl font-bold'>{t('heading')}</h3>
				{hasOtherSessions && (
					<Alert
						trigger={<Button>{t('clearSessionsButton')}</Button>}
						title={t('clearSessionsTitle')}
						description={t('clearSessionsDescription')}
						actionText={t('clearSessionsActionText')}
						cancelText={t('clearSessionsCancelText')}
						onSubmit={terminateAllSessions}
					/>
				)}
			</div>
			<Separator />
			<div className='border rounded-md p-4 flex flex-col gap-8'>
				<SessionList t={t} />
			</div>
		</div>
	)
}
