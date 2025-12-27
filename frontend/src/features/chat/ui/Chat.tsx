'use client'

import { Send } from 'lucide-react'

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

export const Chat = ({ cardId }: { cardId: string }) => {
	const {
		userId,
		message,
		messagesEndRef,
		isPending,
		handleSubmitMessage,
		setMessage
	} = useChat({
		cardId
	})
	const { messages } = useChatStore()

	const handleKeySubmitMessage = (
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			handleSubmitMessage()
		}
	}

	if (isPending) {
		return <div>Loading...</div>
	}

	return (
		<div className='flex flex-col items-center p-4 border-l'>
			<div className='flex flex-col h-[500px] w-[450px]'>
				<div className='flex-1 flex flex-col gap-4 rounded-md overflow-y-auto'>
					{messages.map((message: any) => (
						<>
							{userId === message.userId ? (
								<div
									key={message.id}
									className='flex justify-end items-end gap-2 ml-10'
								>
									<div className='w-[350px]'>
										<div
											className={`relative p-2 border rounded-md wrap-break-word
										${userId === message.userId ? 'bg-blue-500' : 'bg-purple-950/30'}`}
										>
											{message.text}
											<span className='text-[8px] flex justify-end items-end'>
												{formattedDate(
													message.createdAt
												)}
											</span>
										</div>
									</div>
								</div>
							) : (
								<div
									key={message.id}
									className='flex items-end gap-2 mr-10'
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
												message.user.nickname
											)}
										</AvatarFallback>
									</Avatar>
									<div className='w-[350px]'>
										{message.user.nickname}
										<div
											className={`relative p-2 border rounded-md 
										${userId === message.userId ? 'bg-blue-500' : 'bg-purple-950/30'}`}
										>
											{message.text}
											<span className='text-[8px] flex justify-end items-end pl-6'>
												{formattedDate(
													message.createdAt
												)}
											</span>
										</div>
									</div>
								</div>
							)}
						</>
					))}
					<div ref={messagesEndRef} />
				</div>
				<div className='relative mt-2'>
					<Input
						className='relative'
						placeholder='Введите сообщение...'
						value={message}
						onChange={e => setMessage(e.target.value)}
						onKeyDown={handleKeySubmitMessage}
					/>
					<Button
						size='none'
						variant='none'
						className='absolute top-2.5 right-2'
						onClick={handleSubmitMessage}
					>
						<Send />
					</Button>
				</div>
			</div>
		</div>
	)
}
