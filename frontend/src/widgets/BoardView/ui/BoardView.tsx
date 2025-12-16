'use client'
import {
	DndContext,
	DragEndEvent,
	DragStartEvent,
	closestCorners
} from '@dnd-kit/core'

import { ColumnList } from '@/entities/Column/ui/ColumnList'

import { BoardHeaderActions } from '@/features/board-header-actions/ui/BoardHeaderActions'
import { useCardDnd, useColumnDnd, useDndStore } from '@/features/drag-and-drop'

import { useBoard } from '../model/hooks/useBoard'

import { BoardDragOverlay } from './BoardDragOverlay'

export const BoardView = ({ id }: { id: string }) => {
	const { columns, board, isLoading, backgroundStyle, sensors } = useBoard(id)
	const { onColumnDragStart, onColumnDragEnd, onColumnDragOver } =
		useColumnDnd({ boardId: id })
	const { onCardDragStart, onCardDragEnd } = useCardDnd()
	const { activeCard, activeColumn } = useDndStore()

	if (isLoading || !board) return <div>Loading...</div>

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

	return (
		<div className={`relative h-full w-full`}>
			<div
				className='fixed top-0 left-0 w-full h-screen -z-10'
				style={backgroundStyle}
			/>
			<div className='fixed items-center px-4 py-3 w-full bg-zinc-700/30 backdrop-blur-md'>
				<div className='inline-flex items-center justify-between mx-auto w-full max-w-[1450px]'>
					<h1 className='font-bold'>{board?.title}</h1>
					<BoardHeaderActions />
				</div>
			</div>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				onDragOver={onColumnDragOver}
			>
				<div className='flex flex-col gap-6 p-4 h-full pt-20'>
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
