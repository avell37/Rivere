'use client'
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useCallback } from 'react'

import { ICard } from '@/entities/Card'
import { IColumn } from '@/entities/Column'

import { handleApiError } from '@/shared/utils'

import { fetchMoveCardToColumn, fetchReorderCards } from '../api/reorderApi'

interface CardProps {
	setActiveCard: (card: ICard | null) => void
	setColumns: (columns: IColumn[] | ((prev: IColumn[]) => IColumn[])) => void
}

export const useCardDnd = ({ setActiveCard, setColumns }: CardProps) => {
	const t = useTranslations()

	const { mutate: reorderCards } = useMutation({
		mutationFn: fetchReorderCards,
		onError: err => handleApiError(err, t)
	})

	const { mutate: moveMutation } = useMutation({
		mutationFn: fetchMoveCardToColumn,
		onError: err => handleApiError(err, t)
	})

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

					moveMutation({
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
		[setColumns, reorderCards, setActiveCard, moveMutation]
	)

	return {
		onCardDragStart,
		onCardDragEnd
	}
}
