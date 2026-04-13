'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useNotificationsActions } from '@/entities/Notification'
import { useGetUser } from '@/entities/User'

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
	useNotificationsActions()

	useEffect(() => {
		if (!isLoading && !user) {
			router.push(PUBLIC_URL.login())
		}
	}, [user, isLoading, router])

	if (isLoading || !user) return null

	return (
		<main className='flex-1 min-w-0 h-screen flex flex-col'>
			<Header />
			<div className='flex-1 min-w-0 overflow-auto'>{children}</div>
		</main>
	)
}
