import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { fetchMoveCardToColumn, fetchReorderCards } from '../api/reorderApi'
import { useDndStore } from '../store/useDndStore'

export const useCardDnd = () => {
	const {
		columns,
		setColumns,
		setActiveCard,
		setActiveColumn,
		setHoveredColumnId
	} = useDndStore()

	const reorderMutation = useMutation({
		mutationKey: ['reorder cards'],
		mutationFn: ({
			columnId,
			cards
		}: {
			columnId: string
			cards: string[]
		}) => fetchReorderCards({ columnId, cards }),
		onError: () => {
			toast.error('Ошибка при перемещении карточки')
		}
	})

	const moveMutation = useMutation({
		mutationFn: fetchMoveCardToColumn,
		onError: () => toast.error('Ошибка при перемещении карточки')
	})

	const findColumnByCardId = (cardId: string) => {
		return columns.find(column =>
			column.cards.some(card => card.id === cardId)
		)
	}

	const findColumnById = (columnId: string) => {
		return columns.find(column => column.id === columnId)
	}

	const onCardDragStart = ({ active }: DragStartEvent) => {
		setActiveColumn(null)
		if (!active || active.data.current?.type !== 'card') return
		setActiveCard(active.data.current.card)
	}

	const onCardDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		if (!over) {
			setActiveCard(null)
			return
		}

		const activeId = active.id as string
		const overId = over.id as string

		const activeColumn = findColumnByCardId(activeId)
		const overColumn = findColumnByCardId(overId) || findColumnById(overId)

		if (!activeColumn || !overColumn) return

		if (activeColumn.id === overColumn.id) {
			const oldIndex = activeColumn.cards.findIndex(
				card => card.id === activeId
			)
			const newIndex = overColumn.cards.findIndex(
				card => card.id === overId
			)

			const newCards = arrayMove(activeColumn.cards, oldIndex, newIndex)

			const newColumns = columns.map(col =>
				col.id === activeColumn.id ? { ...col, cards: newCards } : col
			)

			setColumns(newColumns)
			setHoveredColumnId(null)

			reorderMutation.mutate({
				columnId: activeColumn.id,
				cards: newCards.map(card => card.id)
			})
		} else {
			const movedCard = activeColumn.cards.find(
				card => card.id === activeId
			)
			if (!movedCard) return

			const newPosition = overColumn.cards.findIndex(
				card => card.id === overId
			)

			const newColumns = columns.map(col => {
				if (col.id === activeColumn.id) {
					return {
						...col,
						cards: col.cards.filter(c => c.id !== activeId)
					}
				}
				if (col.id === overColumn.id) {
					const newCards = [...col.cards]
					newCards.splice(newPosition, 0, {
						...movedCard,
						columnId: overColumn.id
					})
					return { ...col, cards: newCards }
				}
				return col
			})

			setColumns(newColumns)
			setHoveredColumnId(null)

			moveMutation.mutate({
				cardId: activeId,
				newColumnId: overColumn.id,
				position: newPosition + 1
			})
		}
	}

	return {
		onCardDragStart,
		onCardDragEnd
	}
}
