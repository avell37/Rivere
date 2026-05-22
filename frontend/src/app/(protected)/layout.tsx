'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useGetUser } from '@/entities/User'

import { useModerationEvents } from '@/features/admin'
import { useNotifications } from '@/features/notifications'

import { PUBLIC_URL } from '@/shared/libs'

import { Header } from '@/widgets'

export default function ProtectedLayout({
	children
}: {
	children: React.ReactNode
}) {
	const { data: user, isLoading } = useGetUser()
	const router = useRouter()
	useNotifications(user?.id)
	useModerationEvents(user?.id)

	useEffect(() => {
		if (isLoading) return

		if (!user) {
			router.push(PUBLIC_URL.login())
			return
		}

		const now = new Date()

		if (user.bannedUntil && new Date(user.bannedUntil) > now) {
			router.replace(PUBLIC_URL.banned())
		}
	}, [user, isLoading, router])

	if (isLoading || !user) return null

	return (
		<main className='flex-1 min-w-0 h-screen flex flex-col'>
			<Header />
			<div className='flex-1 min-w-0'>{children}</div>
		</main>
	)
}
