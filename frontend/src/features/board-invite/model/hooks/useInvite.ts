'use client'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { PRIVATE_URL } from '@/shared/libs'

import { useInviteEffects } from './useInviteEffects'
import {
	useAcceptInviteToBoard,
	useDeclineInviteToBoard,
	useGetInviteData
} from './useInviteQueries'

export const useInvite = (token?: string) => {
	const t = useTranslations()
	const router = useRouter()

	const {
		inviteData,
		inviteDataPending,
		inviteDataIsError,
		inviteDataError
	} = useGetInviteData(token)
	const { acceptInviteToBoard, acceptPending } = useAcceptInviteToBoard()
	const { declineInviteToBoard, declinePending } = useDeclineInviteToBoard()

	useInviteEffects({ inviteData, inviteDataIsError, inviteDataError })

	const handleAccept = async () => {
		if (!token) return

		await acceptInviteToBoard(token, {
			onSuccess: () => {
				router.push(PRIVATE_URL.boards())
				toast.success(t('invite.acceptedInvite'))
			}
		})
	}

	const handleDecline = async () => {
		if (!token) return

		await declineInviteToBoard(token, {
			onSuccess: () => {
				router.push(PRIVATE_URL.boards())
				toast.success(t('invite.canceledInvite'))
			}
		})
	}

	return {
		inviteData,
		inviteDataPending,
		acceptPending,
		declinePending,
		handleAccept,
		handleDecline
	}
}
