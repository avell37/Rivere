'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

import { ICard } from '@/entities/Card'

import { useDragAndDrop } from '@/features/drag-and-drop'

import { CardSheet } from '../card/CardSheet'

export const BoardCardDeepLink = ({ boardId }: { boardId: string }) => {
	const searchParams = useSearchParams()
	const cardId = searchParams.get('card')
	const { columns } = useDragAndDrop()
	const [dismissedCardId, setDismissedCardId] = useState<string | null>(null)

	const card = useMemo(() => {
		if (!cardId) return null

		for (const column of columns ?? []) {
			const found = column.cards.find(item => item.id === cardId)
			if (found) return found
		}

		return null
	}, [cardId, columns])

	if (!card || card.id === dismissedCardId) return null

	return (
		<CardSheet
			open
			onOpenChange={open => {
				if (!open) setDismissedCardId(card.id)
			}}
			card={card as ICard}
			boardId={boardId}
		/>
	)
}
