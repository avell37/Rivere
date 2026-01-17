'use client'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { priorityOptions } from '@/shared/config'

import { CardProps } from '../types/CardProps'

export const useCard = ({
	id,
	title,
	description,
	priority,
	deadline,
	done,
	columnId
}: CardProps) => {
	const priorityConfig = priorityOptions[priority]
	const sortable = useSortable({
		id,
		data: {
			type: 'card',
			card: {
				id,
				title,
				description,
				priority,
				deadline,
				done,
				columnId
			}
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
