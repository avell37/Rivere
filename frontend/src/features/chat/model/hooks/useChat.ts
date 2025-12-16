import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { Socket, io } from 'socket.io-client'

import { useGetUser } from '@/features/auth/model/hooks/useGetUser'

import { fetchChat } from '../api/chatApi'
import { useChatStore } from '../store/useChatStore'
import { IMessage } from '../types/IMessage'

export const useChat = ({ chatId }: { chatId: string }) => {
	const { data: user } = useGetUser()
	const [message, setMessage] = useState<string>()
	const socketRef = useRef<Socket | null>(null)
	const messagesEndRef = useRef<HTMLDivElement>(null)
	const { messages, setMessages, addMessage } = useChatStore()

	if (!socketRef.current) {
		socketRef.current = io('http://localhost:5000/chat', {
			transports: ['websocket']
		})
	}

	const socket = socketRef.current

	const { data: chat, isPending } = useQuery({
		queryKey: ['messages'],
		queryFn: async () => fetchChat(chatId)
	})

	useEffect(() => {
		if (chat?.messages) {
			setMessages(chat.messages)
		}
	}, [chat])

	useEffect(() => {
		if (!socket) return
		socket.emit('join', { chatId })

		const handleMessage = (msg: IMessage) => addMessage(msg)

		socket.on('message:new', handleMessage)

		return () => {
			socket.emit('leave', { chatId })
			socket.off('message:new', handleMessage)
		}
	}, [socket, chatId])

	const handleSubmitMessage = () => {
		const dto = {
			chatId,
			userId: user.id,
			text: message
		}
		socket.emit('message', dto)
		setMessage('')
	}

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView()
	}

	useEffect(() => {
		scrollToBottom()
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
