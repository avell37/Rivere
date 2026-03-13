'use client'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { SendHorizonal, Smile } from 'lucide-react'

import { ChatSkeleton, ChatUserMessage, useChatStore } from '@/entities/Chat'

import { Button, ScrollArea, Textarea } from '@/shared/ui/external'

import { useChat } from '../model/hooks/useChat'

export const Chat = ({ cardId }: { cardId: string }) => {
	const {
		t,
		locale,
		userId,
		message,
		messagesEndRef,
		isPending,
		showEmoji,
		handleKeySubmitMessage,
		handleSubmitMessage,
		handleEmojiClick,
		setMessage,
		setShowEmoji
	} = useChat({
		cardId
	})
	const { messages } = useChatStore()

	if (isPending) return <ChatSkeleton />

	if (!userId) return null

	return (
		<div className='flex flex-col items-center p-4 border-l dark:bg-zinc-900'>
			<div className='flex flex-col h-[450px] w-[450px]'>
				<ScrollArea className='h-[400px] w-[450px] rounded-md'>
					<div className='flex-1 flex flex-col gap-4 rounded-md overflow-y-auto p-2'>
						{messages.map((message: any, i) => (
							<ChatUserMessage
								key={message.id}
								currentUserId={userId}
								message={message}
								previousMessage={
									i > 0 ? messages[i - 1] : undefined
								}
								locale={locale}
							/>
						))}
						<div ref={messagesEndRef} />
					</div>
				</ScrollArea>
				<div className='relative mt-2 flex items-end'>
					<Textarea
						className='absolute -bottom-10 bg-zinc-100 dark:bg-zinc-800 border-none rounded-2xl px-4 pr-20 py-2 
						resize-none min-h-10 max-h-[120px] focus-visible:ring-1 focus-visible:ring-blue-400 shadow-sm'
						placeholder={t('inputPlaceholder')}
						value={message || ''}
						onChange={e => setMessage(e.target.value)}
						onKeyDown={handleKeySubmitMessage}
						disabled={isPending}
					/>
					<div className='absolute -bottom-9 right-8'>
						<Button
							size='none'
							variant='none'
							className='group'
							onClick={() => setShowEmoji(prev => !prev)}
						>
							<Smile className='text-zinc-500 group-hover:text-blue-400 transition-colors size-5' />
						</Button>
						{showEmoji && (
							<div className='absolute bottom-12 right-0 z-50'>
								<Picker
									data={data}
									onEmojiSelect={handleEmojiClick}
								/>
							</div>
						)}
					</div>
					<Button
						size='none'
						variant='none'
						className='absolute -bottom-7 right-2 group'
						onClick={handleSubmitMessage}
						disabled={isPending}
					>
						<SendHorizonal className='group-hover:text-blue-400 transition-colors' />
					</Button>
				</div>
			</div>
		</div>
	)
}
