'use client'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { SendHorizonal, Smile } from 'lucide-react'
import { useTheme } from 'next-themes'

import {
	ChatSkeleton,
	ChatUserMessage,
	IMessage,
	useChatStore
} from '@/entities/Chat'

import { Button, Textarea } from '@/shared/ui/external'

import { useChat } from '../model/hooks/useChat'

export const Chat = ({ cardId }: { cardId: string }) => {
	const {
		t,
		locale,
		userId,
		message,
		messagesEndRef,
		chatPending,
		showEmoji,
		handleKeySubmitMessage,
		handleSubmitMessage,
		handleEmojiClick,
		setMessage,
		setShowEmoji
	} = useChat({
		cardId
	})
	const { resolvedTheme } = useTheme()
	const { messages } = useChatStore()

	if (chatPending) return <ChatSkeleton />

	if (!userId) return null

	return (
		<div className='flex w-full min-w-0 max-h-86 flex-col overflow-hidden'>
			<div className='max-h-90 min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-4 py-3'>
				<div className='flex w-full min-w-0 flex-col gap-3'>
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
			</div>
			<div className='relative mt-2 flex items-center gap-2'>
				<Textarea
					className='border-b flex-1 w-full focus:rounded-md px-4 pr-16 py-2 resize-none min-h-10 max-h-[120px] focus-visible:ring-1 focus-visible:ring-blue-400'
					placeholder={t('inputPlaceholder')}
					value={message || ''}
					onChange={e => setMessage(e.target.value)}
					onKeyDown={handleKeySubmitMessage}
					disabled={chatPending}
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
							className='absolute bottom-6 -right-20 z-50'
							onWheel={e => e.stopPropagation()}
						>
							<Picker
								data={data}
								theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
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
					disabled={chatPending}
				>
					<SendHorizonal className='group-hover:text-blue-400 transition-colors size-5' />
				</Button>
			</div>
		</div>
	)
}
