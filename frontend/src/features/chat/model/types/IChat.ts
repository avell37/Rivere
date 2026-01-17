import { IMessage } from './IMessage'

export interface IChat {
	id: string
	cardId: string
	messages: IMessage[]
}

export interface ChatUserMessageProps {
	currentUserId: string
	message: IMessage
	previousMessage?: IMessage
	locale: string
}
