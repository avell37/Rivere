'use client'
import { useDroppable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export const useColumn = ({ id }: { id: string }) => {
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
				id
			}
		}
	})
	const { isOver, setNodeRef: setDroppableRef } = useDroppable({
		id,
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
		style,
		isDragging,
		isOver,
		setNodeRef: (node: HTMLElement | null) => {
			setSortableRef(node)
			setDroppableRef(node)
		}
	}
}
