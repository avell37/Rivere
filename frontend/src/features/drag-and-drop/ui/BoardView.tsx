'use client'
import { DndContext, closestCorners } from '@dnd-kit/core'

import { ColumnList } from '@/entities/Column/ui/ColumnList'

import { useBoard } from '../model/hooks/useBoard'
import { useCardDnd } from '../model/hooks/useCardDnd'
import { useColumnDnd } from '../model/hooks/useColumnDnd'
import { useDndStore } from '../model/store/useDndStore'

import { BoardDragOverlay } from './BoardDragOverlay'

interface BoardViewProps {
	id: string
}

export const BoardView = ({ id }: BoardViewProps) => {
	const { columns, board, isLoading, backgroundStyle, sensors } = useBoard(id)
	const { onColumnDragStart, onColumnDragEnd, onColumnDragOver } =
		useColumnDnd({ boardId: id })
	const { onCardDragStart, onCardDragEnd } = useCardDnd()
	const { activeCard, activeColumn } = useDndStore()

	if (isLoading || !board) return <div>Loading...</div>

	return (
		<div className={`h-full w-full`} style={backgroundStyle}>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragStart={event => {
					const type = event.active.data.current?.type

					if (type === 'column') onColumnDragStart(event)
					if (type === 'card') onCardDragStart(event)
				}}
				onDragEnd={event => {
					const type = event.active.data.current?.type

					if (type === 'column') onColumnDragEnd(event)
					if (type === 'card') onCardDragEnd(event)
				}}
				onDragOver={event => {
					onColumnDragOver(event)
				}}
			>
				<div className='flex flex-col gap-6 p-4 h-full w-full mt-16'>
					<h1 className='font-bold'>{board?.title}</h1>
					<ColumnList boardId={id} columns={columns} />
				</div>
				<BoardDragOverlay
					activeCard={activeCard}
					activeColumn={activeColumn}
				/>
			</DndContext>
		</div>
	)
}
