'use client'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useGetUser } from '@/entities/User'

import { PRIVATE_URL, PUBLIC_URL } from '@/shared/libs'

export const Banned = () => {
	const t = useTranslations('banned')
	const { data: user, isLoading } = useGetUser()
	const router = useRouter()

	useEffect(() => {
		if (isLoading) return

		if (!user) {
			router.replace(PUBLIC_URL.login())
			return
		}

		const now = new Date()

		const isBanned = user.bannedUntil && new Date(user.bannedUntil) > now

		if (!isBanned) {
			router.replace(PRIVATE_URL.boards())
		}
	}, [user, isLoading, router])

	const bannedUntilDate = user?.bannedUntil
		? new Date(user.bannedUntil)
		: null

	return (
		<div className='h-screen flex items-center justify-center'>
			<div className='p-6 rounded-xl bg-card text-center'>
				<h1 className='text-2xl font-bold'>{t('title')}</h1>
				{bannedUntilDate && (
					<p className='mt-2 text-sm'>
						{t('date', { date: bannedUntilDate.toLocaleString() })}
					</p>
				)}
				{user?.banReason && (
					<p className='mt-1 text-sm'>
						{t('reason', { reason: user.banReason })}
					</p>
				)}
				<span className='text-sm text-muted-foreground break-all'>
					{t('support')}
				</span>
			</div>
		</div>
	)
}
