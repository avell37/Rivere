'use client'

import { customAvatar } from '@/shared/libs/customAvatar'
import { formattedDate } from '@/shared/libs/formattedDate'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Input
} from '@/shared/ui/external'

import { useChat } from '../model/hooks/useChat'
import { useChatStore } from '../model/store/useChatStore'

export const Chat = ({ chatId }: { chatId: string }) => {
	const {
		userId,
		setMessage,
		messagesEndRef,
		isPending,
		handleSubmitMessage
	} = useChat({
		chatId
	})
	const { messages } = useChatStore()

	if (isPending) {
		return <div>Loading...</div>
	}

	return (
		<div className='flex flex-col items-center p-4 border-l'>
			<div className='flex flex-col h-[500px] w-[400px]'>
				<div className='flex-1 flex flex-col gap-4 rounded-md overflow-y-auto'>
					{messages.map((message: any) => {
						const isUser = userId
						console.log(isUser)
						return (
							<div
								key={message.id}
								className='flex items-end gap-2'
							>
								<Avatar className='size-10 rounded-full'>
									<AvatarImage
										src={
											message.user.avatar
												? message.user.avatar
												: null
										}
										alt={message.user.avatar}
									/>
									<AvatarFallback>
										{customAvatar(
											message.user.displayUsername
										)}
									</AvatarFallback>
								</Avatar>
								<div className=''>
									{message.user.displayUsername}
									<div
										className={`relative p-2 pr-20 border rounded-md
										${isUser === message.userId ? 'bg-blue-500' : 'bg-purple-950/30'}`}
									>
										{message.text}
										<span className='text-[8px] absolute bottom-0 right-1'>
											{formattedDate(message.createdAt)}
										</span>
									</div>
								</div>
							</div>
						)
					})}
					<div ref={messagesEndRef} />
				</div>
				<div className='relative'>
					<Input
						className='relative'
						onChange={e => setMessage(e.target.value)}
					/>
					<Button
						className='absolute'
						onClick={() => handleSubmitMessage()}
					>
						Submit
					</Button>
				</div>
			</div>
		</div>
	)
}
