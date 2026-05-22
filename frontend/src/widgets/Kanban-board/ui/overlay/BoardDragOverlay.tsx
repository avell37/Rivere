'use client'
import { DragOverlay } from '@dnd-kit/core'
import { memo } from 'react'
import { createPortal } from 'react-dom'

import { CardOverlayItem } from '@/entities/Card'
import { ColumnOverlay } from '@/entities/Column'

import { useDragAndDrop } from '@/features/drag-and-drop'

const BoardDragOverlayComponent = () => {
	const { activeCard, activeColumn } = useDragAndDrop()

	if (typeof document === 'undefined') return null

	return createPortal(
		<DragOverlay>
			{activeCard && <CardOverlayItem card={activeCard} />}
			{activeColumn && <ColumnOverlay column={activeColumn} />}
		</DragOverlay>,
		document.body
	)
}

export const BoardDragOverlay = memo(BoardDragOverlayComponent)
