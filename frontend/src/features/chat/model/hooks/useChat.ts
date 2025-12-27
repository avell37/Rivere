import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { Socket, io } from 'socket.io-client'

import { useGetUser } from '@/features/auth/model/hooks/useGetUser'

import { fetchChat } from '../api/chatApi'
import { useChatStore } from '../store/useChatStore'
import { IMessage } from '../types/IMessage'

export const useChat = ({ cardId }: { cardId: string }) => {
	const { data: user } = useGetUser()
	const [message, setMessage] = useState<string>()
	const [chatId, setChatId] = useState<string | null>(null)
	const socketRef = useRef<Socket | null>(null)
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const { messages, setMessages, addMessage } = useChatStore()

	useEffect(() => {
		socketRef.current = io('http://localhost:5000/chat', {
			transports: ['websocket']
		})

		return () => {
			socketRef.current?.disconnect()
		}
	}, [])

	const { data: chat, isPending } = useQuery({
		queryKey: ['messages', cardId],
		queryFn: async () => fetchChat(cardId)
	})

	useEffect(() => {
		if (chat) {
			setMessages(chat.messages)
			setChatId(chat.id)
		}
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
		if (!socketRef.current || !user || !chatId) return

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
		userId: user.id,
		message,
		messagesEndRef,
		isPending,
		handleSubmitMessage,
		setMessage
	}
}
