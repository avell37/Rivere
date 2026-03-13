'use client'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { priorityOptions } from '@/shared/config'

import { ICard } from '../types/ICard'

export const useCard = ({ card }: { card: ICard }) => {
	const priorityConfig = priorityOptions[card.priority]
	const sortable = useSortable({
		id: card.id,
		data: {
			type: 'card',
			card: card
		}
	})

	const style = {
		transform: CSS.Transform.toString(sortable.transform),
		transition: sortable.transition
	}

	return {
		priorityConfig,
		style,
		...sortable
	}
}
