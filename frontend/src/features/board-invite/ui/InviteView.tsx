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
	const {
		inviteData,
		inviteDataPending,
		acceptPending,
		declinePending,
		handleAccept,
		handleDecline
	} = useInvite(token)
	const t = useTranslations('invite')
	const locale = useLocale()

	if (!inviteData || inviteDataPending) return <InviteSkeleton />

	return (
		<div className='h-screen flex items-center justify-center bg-linear-to-br from-white to-gray-300 dark:from-black/40 dark:to-zinc-800 px-4'>
			<div className='relative flex flex-col gap-4 bg-white dark:bg-zinc-800 p-6 rounded-md max-w-lg w-full'>
				<div className='flex flex-col items-center gap-1'>
					<div className='flex flex-col items-center gap-2'>
						<UserAvatar
							avatar={inviteData?.invitedBy?.avatar}
							username={customAvatar(
								inviteData?.invitedBy?.nickname
							)}
							avatarClassname='w-24 h-24 rounded-full'
						/>
						<span className='wrap-break-word'>
							{inviteData?.invitedBy?.nickname}
						</span>
					</div>
					<h1 className='wrap-break-word'>
						{t('page.title', {
							boardName: inviteData?.board?.title
						})}
					</h1>
				</div>
				<div className='flex items-center justify-center gap-2'>
					<div className='bg-green-400 rounded-full p-2 w-1 h-1' />
					<span>
						{t('page.members', {
							count: inviteData?.board?.membersCount
						})}
					</span>
				</div>
				<span className='text-center text-xs text-gray-400'>
					{t('page.validUntil', {
						date: formatDate(inviteData?.expiresAt, locale)
					})}
				</span>
				<div className='flex justify-between gap-2'>
					<Button
						className='flex-1 cursor-pointer'
						disabled={acceptPending}
						onClick={handleAccept}
					>
						{t('page.acceptButton')}
					</Button>
					<Button
						variant='none'
						className='flex-1 bg-red-600 text-black dark:text-white cursor-pointer hover:bg-red-700 transition-all'
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
