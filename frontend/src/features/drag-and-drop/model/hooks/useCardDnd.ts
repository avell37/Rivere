'use client'
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { handleApiError } from '@/shared/utils'

import { fetchMoveCardToColumn, fetchReorderCards } from '../api/reorderApi'
import { useDndStore } from '../store/useDndStore'
import { ReorderCards } from '../types/ReorderPayload'

export const useCardDnd = () => {
	const t = useTranslations()
	const { columns, setColumns, setActiveCard, setActiveColumn } =
		useDndStore()

	const reorderMutation = useMutation({
		mutationFn: ({ columnId, cards }: ReorderCards) =>
			fetchReorderCards({ columnId, cards }),
		onError: err => handleApiError(err, t)
	})

	const moveMutation = useMutation({
		mutationFn: fetchMoveCardToColumn,
		onError: err => handleApiError(err, t)
	})

	const getColumnIndex = (id: string) =>
		columns.findIndex(col => col.id === id)

	const onCardDragStart = ({ active }: DragStartEvent) => {
		setActiveColumn(null)
		if (!active || active.data.current?.type !== 'card') return
		setActiveCard(active.data.current.card)
	}

	const onCardDragEnd = ({ active, over }: DragEndEvent) => {
		setActiveCard(null)
		if (!over) return

		const activeId = active.id as string
		const activeData = active.data.current
		const overData = over.data.current

		if (activeData?.type !== 'card') return

		const fromColumnId = activeData.card.columnId
		let toColumnId: string
		let newIndex: number

		if (overData?.type === 'card') {
			toColumnId = overData.card.columnId
			newIndex = columns[getColumnIndex(toColumnId)]?.cards.findIndex(
				card => card.id === over.id
			)
		} else if (overData?.type === 'column-end') {
			toColumnId = overData.columnId
			newIndex = columns[getColumnIndex(toColumnId)]?.cards.length
		} else return

		if (newIndex === undefined) return

		const fromIndex = getColumnIndex(fromColumnId)
		const toIndex = getColumnIndex(toColumnId)

		if (fromIndex === -1 || toIndex === -1) return

		if (fromColumnId === toColumnId) {
			const column = columns[fromIndex]
			const oldIndex = column.cards.findIndex(
				card => card.id === activeId
			)

			if (oldIndex === newIndex) return

			const newCards = arrayMove(column.cards, oldIndex, newIndex)

			setColumns(prev => {
				const next = [...prev]
				next[fromIndex] = { ...column, cards: newCards }
				return next
			})

			reorderMutation.mutate({
				columnId: fromColumnId,
				cards: newCards.map(card => card.id)
			})

			return
		}

		const fromColumn = columns[fromIndex]
		const toColumn = columns[toIndex]

		const movedCard = fromColumn.cards.find(card => card.id === activeId)
		if (!movedCard) return

		const newFromCards = fromColumn.cards.filter(
			card => card.id !== activeId
		)

		const newToCards = [...toColumn.cards]
		newToCards.splice(newIndex, 0, {
			...movedCard,
			columnId: toColumnId
		})

		setColumns(prev => {
			const next = [...prev]
			next[fromIndex] = { ...fromColumn, cards: newFromCards }
			next[toIndex] = { ...toColumn, cards: newToCards }
			return next
		})

		moveMutation.mutate({
			cardId: activeId,
			newColumnId: toColumnId,
			position: newIndex + 1
		})
	}

	return {
		onCardDragStart,
		onCardDragEnd
	}
}
