'use client'
import { DragOverlay } from '@dnd-kit/core'

import { CardOverlay } from '@/entities/Card'
import { ColumnOverlay } from '@/entities/Column'

import { BoardDragOverlayProps } from '../model/types/BoardProps'

export const BoardDragOverlay = ({
	activeCard,
	activeColumn,
	boardId
}: BoardDragOverlayProps) => {
	return (
		<DragOverlay adjustScale={false}>
			{activeCard ? (
				<div className=''>
					<CardOverlay card={activeCard} />
				</div>
			) : null}
			{activeColumn ? (
				<div className='w-80'>
					<ColumnOverlay column={activeColumn} boardId={boardId} />
				</div>
			) : null}
		</DragOverlay>
	)
}
