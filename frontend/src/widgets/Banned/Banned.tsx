'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useGetUser } from '@/entities/User'

import { PUBLIC_URL } from '@/shared/libs'

export const Banned = () => {
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
			router.replace(PUBLIC_URL.boards())
		}
	}, [user, isLoading, router])

	return (
		<div className='h-screen flex items-center justify-center'>
			<div className='p-6 rounded-xl bg-card text-center'>
				<h1 className='text-2xl font-bold'>
					Вы заблокированы на сайте Rivere
				</h1>
				<p className='mt-2 text-sm'>
					до: {new Date(user?.bannedUntil!).toLocaleString()}
				</p>
				{user?.banReason && (
					<p className='mt-1 text-sm'>Причина: {user.banReason}</p>
				)}
				<span className='text-sm text-muted-foreground break-all'>
					Если вы не согласны с причиной бана, вы можете предоставить
					доказательства на нашу почту: help@rivere.ru
				</span>
			</div>
		</div>
	)
}
