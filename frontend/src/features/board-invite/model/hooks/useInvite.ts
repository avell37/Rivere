import { useMutation, useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { handleApiError } from '@/shared/utils/handleApiError'

import { acceptInvite, createInvite, getInviteData } from '../api/inviteApi'

export const useInvite = (token?: string) => {
	const t = useTranslations()

	const {
		data: createInviteData,
		mutate: createInviteToBoard,
		isPending: createPending
	} = useMutation({
		mutationKey: ['create invite'],
		mutationFn: (boardId: string) => createInvite(boardId),
		onError: err => handleApiError(err, t)
	})

	const { data, isPending } = useQuery({
		queryKey: ['get invite data'],
		queryFn: () => getInviteData(token!),
		enabled: !!token
	})

	const { mutate: acceptInviteToBoard, isPending: acceptPending } =
		useMutation({
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
