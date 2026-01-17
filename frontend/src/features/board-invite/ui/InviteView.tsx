'use client'
import { useLocale, useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { UserAvatar } from '@/entities/User'

import { customAvatar } from '@/shared/config'
import { PUBLIC_URL } from '@/shared/libs'
import { Button } from '@/shared/ui/external'
import { formatDate } from '@/shared/utils'

import { useInvite } from '../model/hooks/useInvite'

import { InviteSkeleton } from './InviteSkeleton'

export const InviteView = () => {
	const router = useRouter()
	const { token } = useParams<{ token: string }>()
	const { data, acceptInviteToBoard, acceptPending } = useInvite(token)
	const t = useTranslations('invite')
	const locale = useLocale()

	const handleAccept = async () => {
		await acceptInviteToBoard(token)
		router.push(PUBLIC_URL.boards())
		toast.success(t('acceptedInvite'))
	}

	if (!data) return <InviteSkeleton />

	return (
		<div className='h-screen flex items-center justify-center'>
			<div className='relative flex flex-col gap-4 bg-zinc-800 p-6 rounded-md max-w-lg w-full'>
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
						onClick={handleAccept}
						disabled={acceptPending}
						className='flex-1'
					>
						{t('page.acceptButton')}
					</Button>
					<Button className='flex-1 bg-red-400/70'>
						{t('page.declineButton')}
					</Button>
				</div>
			</div>
		</div>
	)
}
