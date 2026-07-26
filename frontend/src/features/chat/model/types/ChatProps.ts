import { Dispatch, SetStateAction } from 'react'

export interface EmojiData {
	native: string
	unified: string
	id: string
	shortcodes?: string
}

export type UseChatParams = {
	cardId: string
	boardId: string
}

export type UseChatMentionParams = {
	boardId: string
	cardId: string
	userId: string | null
	message: string
	setMessage: Dispatch<SetStateAction<string>>
}
