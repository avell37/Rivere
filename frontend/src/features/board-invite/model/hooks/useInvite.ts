import { useMutation, useQuery } from '@tanstack/react-query'

import { handleApiError } from '@/shared/utils/handleApiError'

import { acceptInvite, createInvite, getInviteData } from '../api/inviteApi'

export const useInvite = (token?: string) => {
	const {
		data: createInviteData,
		mutate: createInviteToBoard,
		isPending: createPending
	} = useMutation({
		mutationKey: ['create invite'],
		mutationFn: (boardId: string) => createInvite(boardId),
		onError: handleApiError
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
			onError: handleApiError
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
