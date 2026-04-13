'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useGetUser } from '@/entities/User'

import { PUBLIC_URL } from '@/shared/libs'

export default function AdminLayout({
	children
}: {
	children: React.ReactNode
}) {
	const { data: user, isLoading } = useGetUser()
	const router = useRouter()

	useEffect(() => {
		if (!isLoading) {
			if (!user) {
				router.push(PUBLIC_URL.login())
				return
			}

			if (user.role !== 'ADMIN' && user.role !== 'CREATOR') {
				router.push(PUBLIC_URL.boards())
			}
		}
	}, [user, isLoading, router])

	if (
		isLoading ||
		!user ||
		(user.role !== 'ADMIN' && user.role !== 'CREATOR')
	)
		return null

	return <div>{children}</div>
}
