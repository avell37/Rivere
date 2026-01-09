import { useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { Socket, io } from 'socket.io-client'

import { useUserStore } from '@/entities/User/model/store/useUserStore'

import { fetchChat } from '../api/chatApi'
import { useChatStore } from '../store/useChatStore'
import { IMessage } from '../types/IMessage'
import { getChatSocket } from '../utils/chat.socket'

export const useChat = ({ cardId }: { cardId: string }) => {
	const user = useUserStore(state => state.user)

	const [message, setMessage] = useState<string>()
	const [chatId, setChatId] = useState<string | null>(null)

	const socketRef = useRef<Socket | null>(null)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const { messages, setMessages, addMessage } = useChatStore()

	const t = useTranslations('card.chat')
	const locale = useLocale()

	const handleKeySubmitMessage = (
		e: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (e.key === 'Enter') {
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

	const { data: chat, isPending } = useQuery({
		queryKey: ['messages', cardId],
		queryFn: () => fetchChat(cardId)
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
	}, [chatId])

	const handleSubmitMessage = () => {
		if (!socketRef.current || !user || !chatId || !message?.trim()) return

		socketRef.current.emit('message', {
			chatId,
			userId: user.id,
			text: message
		})
		setMessage('')
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
		handleKeySubmitMessage,
		handleSubmitMessage,
		setMessage
	}
}
