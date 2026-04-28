'use client'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { PUBLIC_URL } from '@/shared/libs'

import { getEventsSocket } from '../utils/events.socket'

export const useModerationEvents = (userId?: string | null) => {
	const router = useRouter()
	const queryClient = useQueryClient()

	useEffect(() => {
		if (!userId) return

		const socket = getEventsSocket(userId)

		const onBanned = (data: { reason: string; bannedUntil: string }) => {
			queryClient.invalidateQueries({ queryKey: ['get user data'] })
			toast.error(`Вы забанены: ${data.reason}`)
			router.replace(PUBLIC_URL.banned())
		}

		const onUnbanned = () => {
			queryClient.invalidateQueries({ queryKey: ['get user data'] })
			toast.error(`Вы были разбанены`)
			router.replace(PUBLIC_URL.boards())
		}

		socket.on('user:banned', onBanned)
		socket.on('user:unbanned', onUnbanned)

		return () => {
			socket.off('user:banned', onBanned)
			socket.off('user:unbanned', onUnbanned)
		}
	}, [userId, queryClient, router])
}
