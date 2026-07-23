import { create } from 'zustand'

import { IMessage } from '../types/IMessage'

interface ChatStore {
	messages: IMessage[]
	setMessages: (newMessages: IMessage[]) => void
	addMessage: (msg: IMessage) => void
	markMessageDeleted: (messageId: string, deletedAt: string) => void
}

export const useChatStore = create<ChatStore>(set => ({
	messages: [],
	setMessages: newMessages => set({ messages: newMessages }),
	addMessage: msg =>
		set(state => ({
			messages: [...state.messages, msg]
		})),
	markMessageDeleted: (messageId, deletedAt) =>
		set(state => ({
			messages: state.messages.map(message =>
				message.id === messageId
					? { ...message, deletedAt }
					: message
			)
		}))
}))
