'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { useChatStore, useGetChat } from '@/entities/Chat'
import { useUserStore } from '@/entities/User'

import { useIsMobile } from '@/shared/config'

import { EmojiData, UseChatParams } from '../types/ChatProps'

import { useChatMention } from './useChatMention'
import { useChatSocket } from './useChatSocket'

export const useChat = ({ cardId, boardId }: UseChatParams) => {
	const user = useUserStore(state => state.user)
	const [message, setMessage] = useState('')
	const [messageCardId, setMessageCardId] = useState(cardId)
	const [showEmoji, setShowEmoji] = useState(false)

	if (messageCardId !== cardId) {
		setMessageCardId(cardId)
		setMessage('')
	}
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const { messages, setMessages, resetChat } = useChatStore()
	const t = useTranslations('card.chat')
	const locale = useLocale()
	const isMobile = useIsMobile()
	const { chat, chatPending } = useGetChat(cardId)

	const chatId = chat?.id ?? null
	const userId = user?.id ?? null

	const { emitMessage, emitDeleteMessage } = useChatSocket(chatId)

	const {
		textareaRef,
		mentionQuery,
		mentionCandidates,
		handleMessageChange,
		handleSelectMention,
		resetMention
	} = useChatMention({
		boardId,
		cardId,
		userId,
		message,
		setMessage
	})

	useEffect(() => {
		resetChat()
	}, [cardId, resetChat])

	useEffect(() => {
		if (!chat) return
		setMessages(cardId, chat.messages)
	}, [chat, cardId, setMessages])

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView()
	}, [messages])

	const handleSubmitMessage = useCallback(() => {
		if (!user) return

		if (!emitMessage(message)) {
			toast.error(t('sendError'))
			return
		}

		setMessage('')
		resetMention()
	}, [user, emitMessage, message, resetMention, t])

	const handleKeySubmitMessage = useCallback(
		(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
			if (isMobile) return

			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault()
				handleSubmitMessage()
			}
		},
		[isMobile, handleSubmitMessage]
	)

	const handleDeleteMessage = useCallback(
		(messageId: string) => {
			emitDeleteMessage(messageId)
		},
		[emitDeleteMessage]
	)

	const handleEmojiClick = useCallback((emojiData: EmojiData) => {
		setMessage(prev => (prev || '') + emojiData.native)
	}, [])

	return {
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
	}
}
