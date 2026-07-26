'use client'

import { useCallback, useEffect, useRef } from 'react'
import { Socket } from 'socket.io-client'

import { IMessage, useChatStore } from '@/entities/Chat'

import { getChatSocket } from '../utils/chat.socket'

export const useChatSocket = (chatId: string | null) => {
	const socketRef = useRef<Socket | null>(null)
	const { addMessage, markMessageDeleted } = useChatStore()

	useEffect(() => {
		const socket = getChatSocket()
		socketRef.current = socket

		return () => {
			socketRef.current = null
		}
	}, [])

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

	const emitMessage = useCallback(
		(text: string) => {
			if (!socketRef.current || !chatId || !text.trim()) return false

			socketRef.current.emit('message', { chatId, text })
			return true
		},
		[chatId]
	)

	const emitDeleteMessage = useCallback(
		(messageId: string) => {
			if (!socketRef.current || !chatId) return

			socketRef.current.emit('message:delete', { messageId, chatId })
		},
		[chatId]
	)

	return { emitMessage, emitDeleteMessage }
}
