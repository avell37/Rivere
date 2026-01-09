import { customAvatar } from '@/shared/libs/customAvatar'
import { formatTime } from '@/shared/libs/formattedDate'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/external'

import { useChatMessage } from '../model/hooks/useChatMessage'
import { IMessage } from '../model/types/IMessage'

interface ChatUserMessageProps {
	currentUserId: string
	message: IMessage
	previousMessage?: IMessage
	locale: string
}

export const ChatUserMessage = ({
	currentUserId,
	message,
	previousMessage,
	locale
}: ChatUserMessageProps) => {
	const { isMyMessage, messageDate, showDateDivider, showAvatarAndNickname } =
		useChatMessage({ message, previousMessage, currentUserId, locale })

	return (
		<div className='mb-1'>
			{showDateDivider && (
				<div className='flex justify-center mb-4'>
					<span className='text-xs text-gray-400 px-2 py-1 rounded-2xl bg-gray-600/50'>
						{messageDate}
					</span>
				</div>
			)}

			<div
				className={`flex items-end gap-2 ${
					isMyMessage ? 'justify-end ml-10' : 'justify-start mr-10'
				}`}
			>
				{!isMyMessage && showAvatarAndNickname && (
					<Avatar className='size-10 rounded-full'>
						<AvatarImage
							src={message.user.avatar ?? undefined}
							alt={message.user.nickname}
						/>
						<AvatarFallback>
							{customAvatar(message.user.nickname)}
						</AvatarFallback>
					</Avatar>
				)}

				<div
					className={`w-[350px] ${
						!isMyMessage && !showAvatarAndNickname ? 'ml-12' : ''
					}`}
				>
					{!isMyMessage && showAvatarAndNickname && (
						<div className='text-sm mb-1'>
							{message.user.nickname}
						</div>
					)}

					<div
						className={`relative p-2 border rounded ${
							isMyMessage
								? 'rounded-l-2xl rounded-r-md bg-blue-500'
								: 'rounded-l-md rounded-r-2xl bg-violet-800/80'
						}`}
					>
						<p className='text-sm'>{message.text}</p>
						<span className='text-xs flex justify-end items-end pl-6'>
							{formatTime(message.createdAt, locale)}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}
