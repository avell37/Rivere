'use client'
import { useLocale, useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'

import { IMessage, useChatStore, useGetChat } from '@/entities/Chat'
import { useUserStore } from '@/entities/User'

import { useIsMobile } from '@/shared/config'

import { EmojiData } from '../types/ChatProps'
import { getChatSocket } from '../utils/chat.socket'

export const useChat = ({ cardId }: { cardId: string }) => {
	const user = useUserStore(state => state.user)

	const [message, setMessage] = useState<string>('')
	const [showEmoji, setShowEmoji] = useState(false)

	const socketRef = useRef<Socket | null>(null)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const { messages, setMessages, addMessage, markMessageDeleted } = useChatStore()

	const t = useTranslations('card.chat')
	const locale = useLocale()
	const isMobile = useIsMobile()

	const { chat, chatPending } = useGetChat(cardId)

	const handleKeySubmitMessage = (
		e: React.KeyboardEvent<HTMLTextAreaElement>
	) => {
		if (isMobile) return

		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSubmitMessage()
		}
	}

	useEffect(() => {
		const socket = getChatSocket()
		socketRef.current = socket

		return () => {
			socketRef.current = null
		}
	}, [])

	useEffect(() => {
		if (!chat) return

		setMessages(chat.messages)
	}, [chat, setMessages])

	const chatId = chat?.id ?? null

	useEffect(() => {
		if (!socketRef.current || !chatId) return

		const socket = socketRef.current
		socket.emit('join', { chatId })

		const handleMessage = (msg: IMessage) => addMessage(msg)
		const handleMessageDeleted = (payload: {
			id: string
			deletedAt: string
		}) => markMessageDeleted(payload.id, payload.deletedAt)

		socket.on('message:new', handleMessage)
		socket.on('message:deleted', handleMessageDeleted)

		return () => {
			socket.emit('leave', { chatId })
			socket.off('message:new', handleMessage)
			socket.off('message:deleted', handleMessageDeleted)
		}
	}, [chatId, addMessage, markMessageDeleted])

	const handleSubmitMessage = useCallback(() => {
		if (!socketRef.current || !user || !chatId || !message?.trim()) return

		socketRef.current.emit('message', {
			chatId,
			text: message
		})
		setMessage('')
	}, [user, chatId, message])

	const handleDeleteMessage = useCallback(
		(messageId: string) => {
			if (!socketRef.current || !chatId) return

			socketRef.current.emit('message:delete', {
				messageId,
				chatId
			})
		},
		[chatId]
	)

	const handleEmojiClick = (emojiData: EmojiData) => {
		setMessage(prev => (prev || '') + emojiData.native)
	}

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView()
	}, [messages])

	return {
		t,
		locale,
		userId: user?.id ?? null,
		message,
		messagesEndRef,
		chatPending,
		showEmoji,
		handleKeySubmitMessage,
		handleSubmitMessage,
		handleDeleteMessage,
		handleEmojiClick,
		setMessage,
		setShowEmoji
	}
}
