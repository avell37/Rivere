import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'

import { useCardDnd, useColumnDnd } from '@/features/drag-and-drop'

export const useBoardDndHandlers = ({ boardId }: { boardId: string }) => {
	const { onColumnDragStart, onColumnDragEnd } = useColumnDnd({ boardId })
	const { onCardDragStart, onCardDragEnd } = useCardDnd({ boardId })

	const handleDragStart = (event: DragStartEvent) => {
		const type = event.active.data.current?.type
		if (type === 'column') onColumnDragStart(event)
		else onCardDragStart(event)
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const type = event.active.data.current?.type
		if (type === 'column') onColumnDragEnd(event)
		else onCardDragEnd(event)
	}

	return {
		handleDragStart,
		handleDragEnd
	}
}
