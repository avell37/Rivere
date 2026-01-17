'use client'
import { useDroppable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { ColumnData } from '../types/ColumnProps'

export const useColumn = ({ id, title, cards }: ColumnData) => {
	const {
		attributes,
		listeners,
		setNodeRef: setSortableRef,
		transform,
		transition,
		isDragging
	} = useSortable({
		id,
		data: {
			type: 'column',
			column: {
				id,
				title,
				cards
			}
		}
	})
	const { isOver, setNodeRef: setDroppableRef } = useDroppable({
		id: `column-${id}`,
		data: {
			type: 'column',
			columnId: id
		}
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}

	return {
		attributes,
		listeners,
		setNodeRef: (node: HTMLElement | null) => {
			setSortableRef(node)
			setDroppableRef(node)
		},
		style,
		isDragging,
		isOver
	}
}
