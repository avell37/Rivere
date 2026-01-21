'use client'
import { useLocale, useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { UserAvatar } from '@/entities/User'

import { customAvatar } from '@/shared/config'
import { Button } from '@/shared/ui/external'
import { formatDate } from '@/shared/utils'

import { useInvite } from '../model/hooks/useInvite'

import { InviteSkeleton } from './InviteSkeleton'

export const InviteView = () => {
	const { token } = useParams<{ token: string }>()
	const { data, acceptPending, declinePending, handleAccept, handleDecline } =
		useInvite(token)
	const t = useTranslations('invite')
	const locale = useLocale()

	if (!data) return <InviteSkeleton />

	return (
		<div className='h-screen flex items-center justify-center'>
			<div className='relative flex flex-col gap-4 bg-white dark:bg-zinc-800 p-6 rounded-md max-w-lg w-full'>
				<div className='flex flex-col gap-1'>
					<div className='flex items-center gap-2'>
						<UserAvatar
							avatar={data?.invitedBy?.avatar}
							username={customAvatar(data?.invitedBy?.nickname)}
							avatarClassname='w-8 h-8 rounded-full bg-red-500'
						/>
						<span className='wrap-break-word'>
							{data?.invitedBy?.nickname}
						</span>
					</div>
					<h1 className='wrap-break-word'>
						{t('page.title', { boardName: data?.board?.title })}
					</h1>
				</div>
				<span>
					{t('page.members', { count: data?.board?.membersCount })}
				</span>
				<span className='absolute top-4 right-2 text-xs text-gray-400'>
					{t('page.validUntil', {
						date: formatDate(data?.expiresAt, locale)
					})}
				</span>
				<div className='flex justify-between gap-2'>
					<Button
						className='flex-1'
						disabled={acceptPending}
						onClick={handleAccept}
					>
						{t('page.acceptButton')}
					</Button>
					<Button
						className='flex-1 bg-red-400/70'
						disabled={declinePending}
						onClick={handleDecline}
					>
						{t('page.declineButton')}
					</Button>
				</div>
			</div>
		</div>
	)
}
