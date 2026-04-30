'use client'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { SendHorizonal, Smile } from 'lucide-react'

import {
	ChatSkeleton,
	ChatUserMessage,
	IMessage,
	useChatStore
} from '@/entities/Chat'

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
		<div className='flex flex-col items-center p-4 border-l dark:bg-zinc-900 max-lg:border-l-0 max-lg:border-t w-full'>
			<div className='flex flex-col h-[450px] lg:max-w-[450px] w-full max-lg:h-[60vh] min-h-0 max-lg:max-w-[850px] max-sm:h-[30vh]'>
				<ScrollArea className='flex-1 w-full rounded-md overflow-hidden'>
					<div className='flex flex-col gap-4 rounded-md overflow-y-auto h-full p-2'>
						{messages.map((message: IMessage, i) => (
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
				<div className='relative mt-2 flex items-center gap-2'>
					<Textarea
						className='flex-1 w-full rounded-2xl px-4 pr-16 py-2 resize-none min-h-10 max-h-[120px] focus-visible:ring-1 focus-visible:ring-blue-400 shadow-sm'
						placeholder={t('inputPlaceholder')}
						value={message || ''}
						onChange={e => setMessage(e.target.value)}
						onKeyDown={handleKeySubmitMessage}
						disabled={isPending}
					/>
					<div className='absolute bottom-2.5 right-11 flex'>
						<Button
							size='none'
							variant='none'
							className='group'
							onClick={() => setShowEmoji(prev => !prev)}
						>
							<Smile
								className={`${showEmoji ? 'text-blue-500' : 'text-zinc-500'} group-hover:text-blue-400 transition-colors size-5 `}
							/>
						</Button>
						{showEmoji && (
							<div
								className='absolute bottom-6 right-3 z-50'
								onWheel={e => e.stopPropagation()}
							>
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
						className='absolute bottom-2.5 right-3'
						onClick={handleSubmitMessage}
						disabled={isPending}
					>
						<SendHorizonal className='group-hover:text-blue-400 transition-colors size-5' />
					</Button>
				</div>
			</div>
		</div>
	)
}
