'use client'
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useCallback } from 'react'

import { CardDndProps } from '../types/DragAndDrop'

import { useMoveCardsMutation, useReorderCardsMutation } from './useDndQueries'

export const useCardDnd = ({ setActiveCard, setColumns }: CardDndProps) => {
	const { reorderCards } = useReorderCardsMutation()
	const { moveCards } = useMoveCardsMutation()

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

			const activeId = active.id as string

			setColumns(prev => {
				const fromIndex = prev.findIndex(col =>
					col.cards.some(c => c.id === activeId)
				)
				if (fromIndex === -1) return prev

				let toColumnId: string
				let toIndex: number

				const overData = over.data.current

				if (overData?.type === 'card') {
					toColumnId = overData.card.columnId
					const toColIndex = prev.findIndex(
						col => col.id === toColumnId
					)
					if (toColIndex === -1) return prev

					const overCardIndex = prev[toColIndex].cards.findIndex(
						c => c.id === over.id
					)
					if (overCardIndex === -1) return prev

					toIndex = overCardIndex
				} else if (overData?.type === 'column') {
					toColumnId = over.id as string
					const toColIndex = prev.findIndex(
						col => col.id === toColumnId
					)
					if (toColIndex === -1) return prev

					toIndex = prev[toColIndex].cards.length
				} else {
					return prev
				}

				const toColIndex = prev.findIndex(col => col.id === toColumnId)
				if (toColIndex === -1) return prev

				const next = [...prev]

				const fromColumn = next[fromIndex]
				const toColumn = next[toColIndex]

				const oldIndex = prev[fromIndex].cards.findIndex(
					c => c.id === activeId
				)
				if (oldIndex === -1) return prev

				if (fromIndex === toColIndex) {
					if (oldIndex === toIndex) return prev

					const newCards = arrayMove(
						fromColumn.cards,
						oldIndex,
						toIndex
					)

					next[fromIndex] = {
						...fromColumn,
						cards: newCards
					}

					moveCards({
						cardId: activeId,
						newColumnId: fromColumn.id,
						position: toIndex
					})

					return next
				}

				const movedCard = fromColumn.cards[oldIndex]
				if (!movedCard) return prev

				const newFromCards = fromColumn.cards.filter(
					c => c.id !== activeId
				)

				const newToCards = [...toColumn.cards]
				newToCards.splice(toIndex, 0, {
					...movedCard,
					columnId: toColumn.id
				})

				next[fromIndex] = {
					...fromColumn,
					cards: newFromCards
				}

				next[toColIndex] = {
					...toColumn,
					cards: newToCards
				}

				reorderCards({
					columnId: toColumn.id,
					ids: newToCards.map(c => c.id)
				})

				return next
			})
		},
		[setColumns, reorderCards, setActiveCard, moveCards]
	)

	return {
		onCardDragStart,
		onCardDragEnd
	}
}
