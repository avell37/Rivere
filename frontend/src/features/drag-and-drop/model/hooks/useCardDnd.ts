'use client'
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { useCallback } from 'react'

import { useBoardStore } from '@/entities/Board'

import { resolveCardDrag } from '../lib/resolveCardDrag'
import { CardDndProps } from '../types/DragAndDrop'

import { useMoveCardsMutation, useReorderCardsMutation } from './useDndQueries'

export const useCardDnd = ({ boardId, setActiveCard, setColumns }: CardDndProps) => {
	const { reorderCards } = useReorderCardsMutation(boardId)
	const { moveCards } = useMoveCardsMutation(boardId)

	const onCardDragStart = useCallback(
		({ active }: DragStartEvent) => {
			if (!active || active.data.current?.type !== 'card') return
			setActiveCard(active.data.current.card)
		},
		[setActiveCard]
	)

	const onCardDragEnd = useCallback(
		({ active, over }: DragEndEvent) => {
			setActiveCard(null)

			if (!over) return
			if (active.data.current?.type !== 'card') return
			if (active.id === over.id) return

			const activeId = active.id as string
			const columns = useBoardStore.getState().columns
			const result = resolveCardDrag(columns, activeId, over)

			if (!result) return

			setColumns(result.next)

			if (result.action.type === 'reorder') {
				reorderCards({
					columnId: result.action.columnId,
					ids: result.action.ids
				})
				return
			}

			moveCards({
				cardId: result.action.cardId,
				newColumnId: result.action.newColumnId,
				position: result.action.position
			})
		},
		[setColumns, reorderCards, setActiveCard, moveCards]
	)

	return {
		onCardDragStart,
		onCardDragEnd
	}
}
