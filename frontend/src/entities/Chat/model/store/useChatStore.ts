import { create } from 'zustand'

import { IMessage } from '../types/IMessage'

interface ChatStore {
	messages: IMessage[]
	setMessages: (newMessages: IMessage[]) => void
	addMessage: (msg: IMessage) => void
}

export const useChatStore = create<ChatStore>((set, get) => ({
	messages: [],
	setMessages: newMessages => set({ messages: newMessages }),
	addMessage: msg =>
		set(state => ({
			messages: [...state.messages, msg]
		}))
}))
