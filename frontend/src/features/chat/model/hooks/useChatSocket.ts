'use client'

import { useCallback, useEffect, useRef } from 'react'
import { Socket } from 'socket.io-client'

import { IMessage, useChatStore } from '@/entities/Chat'

import {
	ChatSocketErrorPayload,
	UseChatSocketOptions
} from '../types/ChatProps'
import { getChatSocket } from '../utils/chat.socket'

export const useChatSocket = (
	chatId: string | null,
	options?: UseChatSocketOptions
) => {
	const socketRef = useRef<Socket | null>(null)
	const { addMessage, markMessageDeleted } = useChatStore()
	const onJoinErrorRef = useRef(options?.onJoinError)
	const onMessageErrorRef = useRef(options?.onMessageError)
	const onConnectErrorRef = useRef(options?.onConnectError)

	useEffect(() => {
		onJoinErrorRef.current = options?.onJoinError
		onMessageErrorRef.current = options?.onMessageError
		onConnectErrorRef.current = options?.onConnectError
	}, [options?.onJoinError, options?.onMessageError, options?.onConnectError])

	useEffect(() => {
		if (!chatId) return

		const socket = getChatSocket()
		socketRef.current = socket

		const joinChat = () => {
			socket.emit('join', { chatId })
		}

		if (socket.connected) {
			joinChat()
		} else {
			socket.on('connect', joinChat)
		}

		const handleMessage = (msg: IMessage) => addMessage(msg)
		const handleMessageDeleted = (payload: {
			id: string
			deletedAt: string
		}) => markMessageDeleted(payload.id, payload.deletedAt)
		const handleJoinError = (payload: ChatSocketErrorPayload) =>
			onJoinErrorRef.current?.(payload)
		const handleMessageError = (payload: ChatSocketErrorPayload) =>
			onMessageErrorRef.current?.(payload)
		const handleConnectError = () => onConnectErrorRef.current?.()

		socket.on('message:new', handleMessage)
		socket.on('message:deleted', handleMessageDeleted)
		socket.on('join:error', handleJoinError)
		socket.on('message:error', handleMessageError)
		socket.on('connect_error', handleConnectError)

		return () => {
			socket.emit('leave', { chatId })
			socket.off('connect', joinChat)
			socket.off('message:new', handleMessage)
			socket.off('message:deleted', handleMessageDeleted)
			socket.off('join:error', handleJoinError)
			socket.off('message:error', handleMessageError)
			socket.off('connect_error', handleConnectError)
			socketRef.current = null
		}
	}, [chatId, addMessage, markMessageDeleted])

	const emitMessage = useCallback(
		(text: string) => {
			if (!chatId || !text.trim()) return false

			getChatSocket().emit('message', { chatId, text })
			return true
		},
		[chatId]
	)

	const emitDeleteMessage = useCallback(
		(messageId: string) => {
			if (!chatId) return

			getChatSocket().emit('message:delete', { messageId, chatId })
		},
		[chatId]
	)

	return { emitMessage, emitDeleteMessage }
}
