'use client'
import { MonitorSmartphone } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { SessionList, SessionsSkeleton } from '@/entities/Session'

import { Alert } from '@/shared/ui/custom'
import { Button, Separator } from '@/shared/ui/external'

import { useSession } from '../model/hooks/useSession'

export const Sessions = () => {
	const {
		userSessions,
		hasOtherSessions,
		sessionsIsPending,
		terminateAllSessions,
		terminateSelectedSession
	} = useSession()
	const t = useTranslations('profile.settings.session')
	const locale = useLocale()

	if (sessionsIsPending) return <SessionsSkeleton />

	return (
		<div className='flex flex-col gap-6 w-full'>
			<div className='border rounded-md flex flex-col bg-sidebar p-2'>
				<div className='flex flex-col p-4'>
					<div className='flex items-center gap-4'>
						<div className='bg-linear-to-br from-blue-800 to-blue-300 p-2 rounded-lg'>
							<MonitorSmartphone />
						</div>
						<div className='flex flex-col'>
							<h3 className='text-xl font-bold'>
								{t('heading')}
							</h3>
							<span className='text-xs text-gray-400'>
								{t('description')}
							</span>
						</div>
					</div>
				</div>
				<Separator />
				<SessionList
					t={t}
					locale={locale}
					userSessions={userSessions}
					terminateSelectedSession={terminateSelectedSession}
				/>
				{hasOtherSessions && (
					<Alert
						trigger={
							<Button
								type='button'
								variant='outline'
								className='max-w-[250px] mt-4 p-5'
							>
								{t('clearSessionsButton')}
							</Button>
						}
						title={t('clearSessionsTitle')}
						description={t('clearSessionsDescription')}
						actionText={t('clearSessionsActionText')}
						cancelText={t('clearSessionsCancelText')}
						onSubmit={terminateAllSessions}
					/>
				)}
			</div>
		</div>
	)
}
