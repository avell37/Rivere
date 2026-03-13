'use client'
import { useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'

import { IChat, IMessage, fetchChat, useChatStore } from '@/entities/Chat'
import { useUserStore } from '@/entities/User'

import { getChatSocket } from '../utils/chat.socket'

export const useChat = ({ cardId }: { cardId: string }) => {
	const user = useUserStore(state => state.user)

	const [message, setMessage] = useState<string>('')
	const [chatId, setChatId] = useState<string | null>(null)
	const [showEmoji, setShowEmoji] = useState(false)

	const socketRef = useRef<Socket | null>(null)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const { messages, setMessages, addMessage } = useChatStore()

	const t = useTranslations('card.chat')
	const locale = useLocale()

	const handleKeySubmitMessage = (
		e: React.KeyboardEvent<HTMLTextAreaElement>
	) => {
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

	const { data: chat, isPending } = useQuery<IChat>({
		queryKey: ['messages', cardId],
		queryFn: () => fetchChat(cardId),
		enabled: Boolean(cardId)
	})

	useEffect(() => {
		if (!chat) return

		setMessages(chat.messages)
		setChatId(chat.id)
	}, [chat, setMessages])

	useEffect(() => {
		if (!socketRef.current || !chatId) return
		const socket = socketRef.current

		socket.emit('join', { chatId })

		const handleMessage = (msg: IMessage) => addMessage(msg)

		socket.on('message:new', handleMessage)

		return () => {
			socket.emit('leave', { chatId })
			socket.off('message:new', handleMessage)
		}
	}, [chatId, addMessage])

	const handleSubmitMessage = useCallback(() => {
		if (!socketRef.current || !user || !chatId || !message?.trim()) return

		socketRef.current.emit('message', {
			chatId,
			userId: user.id,
			text: message
		})
		setMessage('')
	}, [user, chatId, message])

	const handleEmojiClick = (emojiData: any) => {
		setMessage(prev => (prev || '') + emojiData.native)
		setShowEmoji(false)
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
		isPending,
		showEmoji,
		handleKeySubmitMessage,
		handleSubmitMessage,
		handleEmojiClick,
		setMessage,
		setShowEmoji
	}
}
