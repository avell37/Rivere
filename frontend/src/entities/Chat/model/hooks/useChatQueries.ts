'use client'
import { useQuery } from '@tanstack/react-query'

import { fetchChat } from '../api/chatApi'
import { IChat } from '../types/IChat'

export const chatKeys = {
	get: (cardId: string) => ['messages', cardId]
}

export const useGetChat = (cardId: string) => {
	const { data: chat, isPending: chatPending } = useQuery<IChat>({
		queryKey: chatKeys.get(cardId),
		queryFn: () => fetchChat(cardId),
		enabled: Boolean(cardId)
	})

	return {
		chat,
		chatPending
	}
}
