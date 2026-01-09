import { formatDate } from '@/shared/libs/formattedDate'

import { IMessage } from '../types/IMessage'

interface useChatMessageProps {
	message: IMessage
	previousMessage?: IMessage
	currentUserId: string
	locale?: string
}

export const useChatMessage = ({
	message,
	previousMessage,
	currentUserId,
	locale = 'ru'
}: useChatMessageProps) => {
	const isMyMessage = currentUserId === message.userId

	const messageDate = formatDate(message.createdAt, locale)
	const previousDate = previousMessage
		? formatDate(previousMessage.createdAt, locale)
		: null
	const showDateDivider = messageDate !== previousDate

	const showAvatarAndNickname =
		!previousMessage ||
		previousMessage.userId !== message.userId ||
		new Date(message.createdAt).getTime() -
			new Date(previousMessage.createdAt).getTime() >
			10 * 60 * 1000

	return { isMyMessage, messageDate, showDateDivider, showAvatarAndNickname }
}
