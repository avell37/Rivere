import { formatDate } from '@/shared/utils'

import { ChatUserMessageProps } from '../types/IChat'

export const useChatMessage = ({
	message,
	previousMessage,
	currentUserId,
	locale = 'ru'
}: ChatUserMessageProps) => {
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
