'use client'

import { KeyboardEvent, useCallback, useState } from 'react'
import { toast } from 'sonner'

import { CardTagPayload, ICardTag, useUpdateCardMutation } from '@/entities/Card'

import { MAX_CARD_TAGS, TAG_COLORS } from '@/shared/config/tagColors'

const toTagPayload = (tags: ICardTag[]): CardTagPayload[] =>
	tags.map(({ title, background }) => ({ title, background }))

export const useEditableTags = ({
	cardId,
	boardId,
	tags,
	t
}: {
	cardId: string
	boardId: string
	tags: ICardTag[]
	t: (key: string) => string
}) => {
	const [title, setTitle] = useState('')
	const [selectedColor, setSelectedColor] = useState<string>(TAG_COLORS[0])
	const { updateCard, updateCardPending } = useUpdateCardMutation(
		cardId,
		boardId
	)

	const saveTags = useCallback(
		(nextTags: CardTagPayload[]) => {
			updateCard(
				{ tags: nextTags },
				{
					onSuccess: () => toast.success(t('editSuccess'))
				}
			)
		},
		[updateCard, t]
	)

	const handleAddTag = useCallback(() => {
		const trimmed = title.trim()
		if (!trimmed) return

		if (tags.length >= MAX_CARD_TAGS) {
			toast.error(t('tagsMax'))
			return
		}

		if (
			tags.some(tag => tag.title.toLowerCase() === trimmed.toLowerCase())
		) {
			toast.error(t('tagsDuplicate'))
			return
		}

		saveTags([
			...toTagPayload(tags),
			{ title: trimmed, background: selectedColor }
		])
		setTitle('')
	}, [title, tags, selectedColor, saveTags, t])

	const handleRemoveTag = useCallback(
		(tagId: string) => {
			saveTags(toTagPayload(tags.filter(tag => tag.id !== tagId)))
		},
		[tags, saveTags]
	)

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				event.preventDefault()
				handleAddTag()
			}
		},
		[handleAddTag]
	)

	return {
		title,
		setTitle,
		selectedColor,
		setSelectedColor,
		updateCardPending,
		canAddMore: tags.length < MAX_CARD_TAGS,
		handleAddTag,
		handleRemoveTag,
		handleKeyDown
	}
}
