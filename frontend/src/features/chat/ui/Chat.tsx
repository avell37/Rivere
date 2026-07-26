'use client'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { SendHorizonal, Smile } from 'lucide-react'
import { useTheme } from 'next-themes'

import { ChatSkeleton, ChatUserMessage, IMessage } from '@/entities/Chat'

import { Button, Textarea } from '@/shared/ui/external'

import { useChat } from '../model/hooks/useChat'

import { ChatMentionSuggestions } from './ChatMentionSuggestions'

export const Chat = ({
	cardId,
	boardId
}: {
	cardId: string
	boardId: string
}) => {
	const { resolvedTheme } = useTheme()
	const {
		t,
		locale,
		userId,
		messages,
		message,
		messagesEndRef,
		textareaRef,
		chatPending,
		showEmoji,
		mentionQuery,
		mentionCandidates,
		handleMessageChange,
		handleSelectMention,
		handleKeySubmitMessage,
		handleSubmitMessage,
		handleDeleteMessage,
		handleEmojiClick,
		setShowEmoji
	} = useChat({ cardId, boardId })

	if (chatPending) return <ChatSkeleton />

	if (!userId) return null

	return (
		<div className='min-w-0 overflow-x-hidden'>
			<span className='text-xs text-muted-foreground ml-1'>
				{t('heading')}
			</span>
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
								onDelete={handleDeleteMessage}
							/>
						))}
						<div ref={messagesEndRef} />
					</div>
				</div>

				<div className='relative mt-2 flex items-center gap-2'>
					{mentionQuery !== null && (
						<ChatMentionSuggestions
							members={mentionCandidates}
							onSelect={handleSelectMention}
						/>
					)}

					<Textarea
						ref={textareaRef}
						className='border-b flex-1 w-full focus:rounded-md px-4 pr-16 py-2 resize-none min-h-10 max-h-[120px] focus-visible:ring-1 focus-visible:ring-blue-400'
						placeholder={t('inputPlaceholder')}
						value={message || ''}
						onChange={e => handleMessageChange(e.target.value)}
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
									theme={
										resolvedTheme === 'dark'
											? 'dark'
											: 'light'
									}
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
		</div>
	)
}
