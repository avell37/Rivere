'use client'

import { Send } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { formatDate } from '@/shared/libs/formattedDate'
import { Button, Input, ScrollArea } from '@/shared/ui/external'
import { Spinner } from '@/shared/ui/external/Spinner/Spinner'

import { useChat } from '../model/hooks/useChat'
import { useChatStore } from '../model/store/useChatStore'

import { ChatUserMessage } from './ChatUserMessage'

export const Chat = ({ cardId }: { cardId: string }) => {
	const {
		t,
		locale,
		userId,
		message,
		messagesEndRef,
		isPending,
		handleKeySubmitMessage,
		handleSubmitMessage,
		setMessage
	} = useChat({
		cardId
	})
	const { messages } = useChatStore()

	if (isPending) {
		return (
			<div className='border-l bg-zinc-900 p-4'>
				<div className='flex justify-center items-center h-[450px] w-[450px]'>
					<Spinner className='size-8' />
				</div>
			</div>
		)
	}

	if (!userId) return null

	return (
		<div className='flex flex-col items-center p-4 border-l bg-zinc-900'>
			<div className='flex flex-col h-[450px] w-[450px]'>
				<ScrollArea className='h-[400px] w-[450px] rounded-md p-2'>
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
				<div className='relative mt-2'>
					<Input
						className='relative'
						placeholder={t('inputPlaceholder')}
						value={message || ''}
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
