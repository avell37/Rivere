import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { handleApiError } from '@/shared/utils/handleApiError'

import { fetchMoveCardToColumn, fetchReorderCards } from '../api/reorderApi'
import { useDndStore } from '../store/useDndStore'

export const useCardDnd = ({ boardId }: { boardId: string }) => {
	const t = useTranslations()
	const queryClient = useQueryClient()
	const { columns, setColumns, setActiveCard, setActiveColumn } =
		useDndStore()

	const reorderMutation = useMutation({
		mutationKey: ['reorder cards'],
		mutationFn: ({
			columnId,
			cards
		}: {
			columnId: string
			cards: string[]
		}) => fetchReorderCards({ columnId, cards }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get board', boardId] })
		},
		onError: err => handleApiError(err, t)
	})

	const moveMutation = useMutation({
		mutationFn: fetchMoveCardToColumn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get board', boardId] })
		},
		onError: err => handleApiError(err, t)
	})

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
		setActiveCard(null)

		if (!over) return

		const activeId = active.id as string
		const activeData = active.data.current
		const overData = over.data.current

		if (activeData?.type !== 'card') return

		const fromColumnId = activeData.card.columnId
		let toColumnId: string
		let newPosition: number

		if (overData?.type === 'card') {
			toColumnId = overData.card.columnId
			const targetColumn = findColumnById(toColumnId)
			if (!targetColumn) return

			newPosition = targetColumn.cards.findIndex(
				card => card.id === over.id
			)
		} else if (overData?.type === 'column-end') {
			toColumnId = overData.columnId
			const targetColumn = findColumnById(toColumnId)
			if (!targetColumn) return

			newPosition = targetColumn.cards.length
		} else {
			return
		}

		const fromColumn = findColumnById(fromColumnId)
		const toColumn = findColumnById(toColumnId)

		if (!fromColumn || !toColumn) return

		if (fromColumnId === toColumnId) {
			const oldIndex = fromColumn.cards.findIndex(
				card => card.id === activeId
			)

			const newCards = arrayMove(fromColumn.cards, oldIndex, newPosition)

			setColumns(
				columns.map(col =>
					col.id === fromColumnId ? { ...col, cards: newCards } : col
				)
			)

			reorderMutation.mutate({
				columnId: fromColumnId,
				cards: newCards.map(card => card.id)
			})

			return
		}

		const movedCard = fromColumn.cards.find(card => card.id === activeId)
		if (!movedCard) return

		setColumns(
			columns.map(col => {
				if (col.id === fromColumnId) {
					return {
						...col,
						cards: col.cards.filter(c => c.id !== activeId)
					}
				}

				if (col.id === toColumnId) {
					const newCards = [...col.cards]
					newCards.splice(newPosition, 0, {
						...movedCard,
						columnId: toColumnId
					})
					return { ...col, cards: newCards }
				}

				return col
			})
		)

		moveMutation.mutate({
			cardId: activeId,
			newColumnId: toColumnId,
			position: newPosition + 1
		})
	}

	return {
		onCardDragStart,
		onCardDragEnd
	}
}
