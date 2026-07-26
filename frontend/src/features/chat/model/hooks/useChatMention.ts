'use client'

import { useCallback, useMemo, useRef, useState } from 'react'

import { useGetAllBoardMembers } from '@/entities/Board'

import {
	insertMention as buildMentionText,
	extractMentionQuery
} from '@/shared/utils'

import { UseChatMentionParams } from '../types/ChatProps'

export const useChatMention = ({
	boardId,
	cardId,
	userId,
	message,
	setMessage
}: UseChatMentionParams) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null)
	const [mentionQuery, setMentionQuery] = useState<string | null>(null)
	const [mentionCardId, setMentionCardId] = useState(cardId)
	const { boardMembers } = useGetAllBoardMembers(boardId)

	if (mentionCardId !== cardId) {
		setMentionCardId(cardId)
		setMentionQuery(null)
	}

	const mentionCandidates = useMemo(() => {
		if (mentionQuery === null) return []

		return boardMembers
			.filter(member => member.userId !== userId)
			.filter(member => {
				const username = member.user.username.toLowerCase()
				const nickname = member.user.nickname.toLowerCase()

				return (
					username.includes(mentionQuery) ||
					nickname.includes(mentionQuery)
				)
			})
			.slice(0, 6)
	}, [boardMembers, mentionQuery, userId])

	const resetMention = useCallback(() => {
		setMentionQuery(null)
	}, [])

	const handleMessageChange = useCallback(
		(value: string) => {
			setMessage(value)
			const cursor = textareaRef.current?.selectionStart ?? value.length
			setMentionQuery(extractMentionQuery(value, cursor))
		},
		[setMessage]
	)

	const handleSelectMention = useCallback(
		(username: string) => {
			const cursor = textareaRef.current?.selectionStart ?? message.length

			setMessage(prev => {
				const { nextText } = buildMentionText(prev, cursor, username)
				return nextText
			})
			setMentionQuery(null)
			textareaRef.current?.focus()
		},
		[message.length, setMessage]
	)

	return {
		textareaRef,
		mentionQuery,
		mentionCandidates,
		handleMessageChange,
		handleSelectMention,
		resetMention
	}
}
