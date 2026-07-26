'use client'

import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { useGetAllBoardMembers } from '@/entities/Board'

import { useUpdateCard } from './useUpdateCard'

export const useEditableAssignee = ({
	cardId,
	boardId
}: {
	cardId: string
	boardId: string
}) => {
	const { watch, setValue } = useFormContext()
	const assigneeId: string | null = watch('assigneeId') ?? null

	const { handleChange, isLoading } = useUpdateCard(
		cardId,
		boardId,
		'assigneeId'
	)
	const { boardMembers, membersPending } = useGetAllBoardMembers(boardId)

	const currentAssignee = boardMembers.find(
		member => member.userId === assigneeId
	)

	const handleSelect = useCallback(
		(userId: string) => {
			const next = assigneeId === userId ? null : userId
			setValue('assigneeId', next)
			handleChange(next)
		},
		[assigneeId, setValue, handleChange]
	)

	const handleClear = useCallback(() => {
		setValue('assigneeId', null)
		handleChange(null)
	}, [setValue, handleChange])

	return {
		assigneeId,
		currentAssignee,
		boardMembers,
		membersPending,
		isLoading,
		handleSelect,
		handleClear
	}
}
