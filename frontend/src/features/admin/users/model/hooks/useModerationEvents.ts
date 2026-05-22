'use client'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { userKeys } from '@/entities/User'

import { PRIVATE_URL, PUBLIC_URL } from '@/shared/libs'

import { getEventsSocket } from '../utils/events.socket'

export const useModerationEvents = (userId?: string | null) => {
	const t = useTranslations('events.moderation')
	const router = useRouter()
	const queryClient = useQueryClient()

	useEffect(() => {
		if (!userId) return

		const socket = getEventsSocket(userId)

		const onBanned = async (data: {
			reason: string
			bannedUntil: string
		}) => {
			await queryClient.invalidateQueries({ queryKey: userKeys.user })
			toast.error(t('banned', { reason: data.reason }))
			router.replace(PUBLIC_URL.banned())
		}

		const onUnbanned = async () => {
			await queryClient.invalidateQueries({ queryKey: userKeys.user })
			toast.error(t('unbanned'))
			router.replace(PRIVATE_URL.boards())
		}

		socket.on('user:banned', onBanned)
		socket.on('user:unbanned', onUnbanned)

		return () => {
			socket.off('user:banned', onBanned)
			socket.off('user:unbanned', onUnbanned)
		}
	}, [userId, queryClient, router, t])
}
