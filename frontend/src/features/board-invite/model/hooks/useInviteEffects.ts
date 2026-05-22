'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { PRIVATE_URL } from '@/shared/libs'
import { handleApiError } from '@/shared/utils'

import { InviteEffectsProps } from '../types/InviteProps'

export const useInviteEffects = ({
	inviteData,
	inviteDataIsError,
	inviteDataError
}: InviteEffectsProps) => {
	const router = useRouter()
	const t = useTranslations()

	useEffect(() => {
		if (!inviteDataIsError) return

		handleApiError(inviteDataError, t)
		router.replace(PRIVATE_URL.boards())
	}, [inviteDataIsError, inviteDataError, t, router])

	useEffect(() => {
		if (!inviteData?.isMember) return

		toast.info(t('invite.alreadyMember'))
		router.replace(PRIVATE_URL.boards())
	}, [inviteData, t, router])
}
