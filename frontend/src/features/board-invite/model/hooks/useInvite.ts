'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { boardKeys } from '@/entities/Board'

import { PUBLIC_URL } from '@/shared/libs'
import { handleApiError } from '@/shared/utils'

import {
	acceptInvite,
	createInvite,
	declineInvite,
	getInviteData
} from '../api/inviteApi'
import {
	CreateInviteResponse,
	GetInviteResponse
} from '../types/InviteResponse'

export const useInvite = (token?: string) => {
	const t = useTranslations()
	const router = useRouter()
	const queryClient = useQueryClient()

	const {
		data: createInviteData,
		mutate: createInviteToBoard,
		isPending: createPending
	} = useMutation<CreateInviteResponse, unknown, string>({
		mutationKey: ['create invite'],
		mutationFn: createInvite,
		onError: err => handleApiError(err, t)
	})

	const { data, isPending, isError, error } = useQuery<
		GetInviteResponse,
		AxiosError
	>({
		queryKey: ['get invite data', token],
		queryFn: () => getInviteData(token as string),
		enabled: Boolean(token)
	})

	const { mutate: acceptInviteToBoard, isPending: acceptPending } =
		useMutation<boolean, unknown, string>({
			mutationKey: ['accept invite'],
			mutationFn: acceptInvite,
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: boardKeys.all })
			},
			onError: err => handleApiError(err, t)
		})

	const { mutate: declineInviteToBoard, isPending: declinePending } =
		useMutation<boolean, unknown, string>({
			mutationKey: ['decline invite'],
			mutationFn: declineInvite,
			onError: err => handleApiError(err, t)
		})

	const handleAccept = async () => {
		if (!token) return

		await acceptInviteToBoard(token)
		router.push(PUBLIC_URL.boards())
		toast.success(t('invite.acceptedInvite'))
	}

	const handleDecline = async () => {
		if (!token) return

		await declineInviteToBoard(token)
		router.push(PUBLIC_URL.boards())
		toast.success(t('invite.canceledInvite'))
	}

	useEffect(() => {
		if (isError) {
			handleApiError(error, t)
			router.replace(PUBLIC_URL.boards())
		}
	}, [isError, error, t, router])

	useEffect(() => {
		if (data?.isMember) {
			toast.info(t('invite.alreadyMember'))
			router.replace(PUBLIC_URL.boards())
		}
	}, [data, t, router])

	return {
		createInviteData,
		data,
		isPending,
		createPending,
		acceptPending,
		declinePending,
		handleAccept,
		handleDecline,
		createInviteToBoard,
		acceptInviteToBoard,
		declineInviteToBoard
	}
}
