import { Over } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { IColumn } from '@/entities/Column'

export type CardDragAction =
	| { type: 'reorder'; columnId: string; ids: string[] }
	| {
			type: 'move'
			cardId: string
			newColumnId: string
			position: number
	  }

export type CardDragResult = {
	next: IColumn[]
	action: CardDragAction
}

export const resolveCardDrag = (
	columns: IColumn[],
	activeId: string,
	over: Over
): CardDragResult | null => {
	const fromColIndex = columns.findIndex(col =>
		col.cards.some(c => c.id === activeId)
	)
	if (fromColIndex === -1) return null

	const fromColumn = columns[fromColIndex]
	const oldIndex = fromColumn.cards.findIndex(c => c.id === activeId)
	if (oldIndex === -1) return null

	const overData = over.data.current

	let toColIndex: number
	let toIndex: number

	if (overData?.type === 'card') {
		toColIndex = columns.findIndex(
			col => col.id === overData.card.columnId
		)
		if (toColIndex === -1) return null

		toIndex = columns[toColIndex].cards.findIndex(c => c.id === over.id)
		if (toIndex === -1) return null
	} else if (overData?.type === 'column') {
		toColIndex = columns.findIndex(col => col.id === over.id)
		if (toColIndex === -1) return null

		toIndex = columns[toColIndex].cards.length
	} else {
		return null
	}

	const toColumn = columns[toColIndex]

	if (fromColIndex === toColIndex) {
		if (oldIndex === toIndex) return null

		const newCards = arrayMove(fromColumn.cards, oldIndex, toIndex)
		const next = columns.map((col, index) =>
			index === fromColIndex ? { ...col, cards: newCards } : col
		)

		return {
			next,
			action: {
				type: 'reorder',
				columnId: fromColumn.id,
				ids: newCards.map(c => c.id)
			}
		}
	}

	const movedCard = fromColumn.cards[oldIndex]
	if (!movedCard) return null

	const newFromCards = fromColumn.cards.filter(c => c.id !== activeId)
	const newToCards = [...toColumn.cards]
	newToCards.splice(toIndex, 0, {
		...movedCard,
		columnId: toColumn.id
	})

	const next = columns.map((col, index) => {
		if (index === fromColIndex) {
			return { ...col, cards: newFromCards }
		}
		if (index === toColIndex) {
			return { ...col, cards: newToCards }
		}
		return col
	})

	return {
		next,
		action: {
			type: 'move',
			cardId: activeId,
			newColumnId: toColumn.id,
			position: toIndex
		}
	}
}
