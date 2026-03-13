'use client'
import { DragOverlay } from '@dnd-kit/core'
import { memo, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { CardOverlayItem } from '@/entities/Card'
import { ColumnOverlay } from '@/entities/Column'

import { useDragAndDrop } from '@/features/drag-and-drop/ui/DndProvider'

export const BoardDragOverlay = memo(({ boardId }: { boardId: string }) => {
	const { activeCard, activeColumn } = useDragAndDrop()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	return createPortal(
		<DragOverlay>
			{activeCard && <CardOverlayItem card={activeCard} />}
			{activeColumn && (
				<ColumnOverlay column={activeColumn} boardId={boardId} />
			)}
		</DragOverlay>,
		document.body
	)
})
