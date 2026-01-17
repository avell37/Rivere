import { useMutation, useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { handleApiError } from '@/shared/utils'

import { acceptInvite, createInvite, getInviteData } from '../api/inviteApi'
import {
	CreateInviteResponse,
	GetInviteResponse
} from '../types/InviteResponse'

export const useInvite = (token?: string) => {
	const t = useTranslations()

	const {
		data: createInviteData,
		mutate: createInviteToBoard,
		isPending: createPending
	} = useMutation<CreateInviteResponse, unknown, string>({
		mutationKey: ['create invite'],
		mutationFn: (boardId: string) => createInvite(boardId),
		onError: err => handleApiError(err, t)
	})

	const { data, isPending } = useQuery<GetInviteResponse>({
		queryKey: ['get invite data'],
		queryFn: () => getInviteData(token!),
		enabled: !!token
	})

	const { mutate: acceptInviteToBoard, isPending: acceptPending } =
		useMutation<boolean, unknown, string>({
			mutationKey: ['accept invite'],
			mutationFn: (token: string) => acceptInvite(token),
			onError: err => handleApiError(err, t)
		})

	return {
		createInviteData,
		data,
		isPending,
		createPending,
		acceptPending,
		createInviteToBoard,
		acceptInviteToBoard
	}
}
