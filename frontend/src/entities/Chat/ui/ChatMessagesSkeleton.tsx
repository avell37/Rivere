import { ChatUserMessageSkeleton } from './ChatUserMessageSkeleton'

export const ChatMessagesSkeleton = () => {
	return (
		<div className='flex flex-col gap-4'>
			<ChatUserMessageSkeleton />
			<ChatUserMessageSkeleton />
			<ChatUserMessageSkeleton />
			<ChatUserMessageSkeleton />
			<ChatUserMessageSkeleton />
		</div>
	)
}
