'use client'
import { useEffect } from 'react'
import { Socket } from 'socket.io-client'

import { useDndStore } from '@/features/drag-and-drop'

import { ICardMoved, ICardsReordered } from '../types/CardProps'
import { ICard } from '../types/ICard'

export const useCardEvents = (socket: Socket | null, boardId: string) => {
	const { columns, setColumns } = useDndStore()

	useEffect(() => {
		if (!socket) return

		const onCardCreated = (card: ICard) => {
			setColumns(prev =>
				prev.map(column =>
					column.id === card.columnId
						? { ...column, cards: [...column.cards, card] }
						: column
				)
			)
		}

		const onCardUpdated = (card: ICard) => {
			setColumns(prev =>
				prev.map(column => ({
					...column,
					cards: column.cards.map(c => (c.id === card.id ? card : c))
				}))
			)
		}

		const onCardDeleted = ({ cardId }: { cardId: string }) => {
			setColumns(prev =>
				prev.map(column => ({
					...column,
					cards: column.cards.filter(card => card.id !== cardId)
				}))
			)
		}

		const onCardMoved = ({
			cardId,
			fromColumnId,
			toColumnId,
			position
		}: ICardMoved) => {
			setColumns(prev => {
				let movedCard: any = null

				const withoutCard = prev.map(column => {
					if (column.id === fromColumnId) {
						const cards = column.cards.filter(card => {
							if (card.id === cardId) movedCard = card
							return card.id !== cardId
						})
						return { ...column, cards }
					}
					return column
				})

				if (!movedCard) return prev

				return withoutCard.map(column => {
					if (column.id === toColumnId) {
						const cards = [...column.cards]
						cards.splice(position, 0, movedCard)
						return { ...column, cards }
					}
					return column
				})
			})
		}

		const onCardsReordered = ({ columnId, cards }: ICardsReordered) => {
			setColumns(prev =>
				prev.map(column => {
					if (column.id !== columnId) return column

					const map = new Map(
						column.cards.map(card => [card.id, card])
					)

					return {
						...column,
						cards: cards
							.sort((a, b) => a.position - b.position)
							.map(card => map.get(card.id)!)
					}
				})
			)
		}

		socket.on('card:created', onCardCreated)
		socket.on('card:updated', onCardUpdated)
		socket.on('card:deleted', onCardDeleted)
		socket.on('card:moved', onCardMoved)
		socket.on('cards:reordered', onCardsReordered)

		return () => {
			socket.off('card:created', onCardCreated)
			socket.off('card:updated', onCardUpdated)
			socket.off('card:deleted', onCardDeleted)
			socket.off('card:moved', onCardMoved)
			socket.off('cards:reordered', onCardsReordered)
		}
	}, [socket, boardId])
}
