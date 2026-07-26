import { create } from 'zustand'

import { IMessage } from '../types/IMessage'

interface ChatStore {
	cardId: string | null
	messages: IMessage[]
	setMessages: (cardId: string, newMessages: IMessage[]) => void
	resetChat: () => void
	addMessage: (msg: IMessage) => void
	markMessageDeleted: (messageId: string, deletedAt: string) => void
}

export const useChatStore = create<ChatStore>(set => ({
	cardId: null,
	messages: [],
	setMessages: (cardId, newMessages) => set({ cardId, messages: newMessages }),
	resetChat: () => set({ cardId: null, messages: [] }),
	addMessage: msg =>
		set(state => {
			if (state.messages.some(message => message.id === msg.id)) {
				return state
			}

			return {
				messages: [...state.messages, msg]
			}
		}),
	markMessageDeleted: (messageId, deletedAt) =>
		set(state => ({
			messages: state.messages.map(message =>
				message.id === messageId
					? { ...message, deletedAt }
					: message
			)
		}))
}))
