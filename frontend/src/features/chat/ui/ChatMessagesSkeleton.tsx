import { ChatUserMessageSkeleton } from './ChatUserMessageSkeleton'

export const ChatMessagesSkeleton = () => {
	return (
		<div className='flex flex-col gap-4 p-2'>
			<ChatUserMessageSkeleton />
			<ChatUserMessageSkeleton isMy />
			<ChatUserMessageSkeleton />
			<ChatUserMessageSkeleton isMy />
			<ChatUserMessageSkeleton />
		</div>
	)
}
