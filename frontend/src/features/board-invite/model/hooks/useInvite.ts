import { useMutation } from '@tanstack/react-query'

import { acceptInvite, createInvite } from '../api/inviteApi'

export const useInvite = () => {
	const {
		data: createInviteData,
		mutate: createInviteToBoard,
		isPending: createPending
	} = useMutation({
		mutationKey: ['create invite'],
		mutationFn: (boardId: string) => createInvite(boardId)
	})

	const {
		data: acceptInviteData,
		mutate: acceptInviteToBoard,
		isPending: acceptPending
	} = useMutation({
		mutationKey: ['accept invite'],
		mutationFn: (token: string) => acceptInvite(token)
	})

	return {
		createInviteData,
		acceptInviteData,
		createPending,
		acceptPending,
		createInviteToBoard,
		acceptInviteToBoard
	}
}
