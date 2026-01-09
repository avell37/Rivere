'use client'
import {
	DndContext,
	DragEndEvent,
	DragStartEvent,
	rectIntersection
} from '@dnd-kit/core'

import { ColumnList } from '@/entities/Column/ui/ColumnList'

import { useCardDnd, useColumnDnd, useDndStore } from '@/features/drag-and-drop'

import { useSidebar } from '@/shared/ui/external'

import { BoardHeaderActions } from '@/widgets/board-header-actions/ui/BoardHeaderActions'

import { useBoard } from '../model/hooks/useBoard'

import { BoardDragOverlay } from './BoardDragOverlay'

export const BoardView = ({ boardId }: { boardId: string }) => {
	const { columns, board, isLoading, backgroundStyle, sensors } =
		useBoard(boardId)
	const { onColumnDragStart, onColumnDragEnd } = useColumnDnd({ boardId })
	const { onCardDragStart, onCardDragEnd } = useCardDnd({ boardId })
	const { activeCard, activeColumn } = useDndStore()
	const { state } = useSidebar()

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
				<div
					className={`inline-flex items-center justify-between mx-auto w-full transition-all
					${state === 'collapsed' ? 'max-w-[1900px]' : 'max-w-[1620px]'}`}
				>
					<h1 className='font-bold'>{board?.title}</h1>
					<BoardHeaderActions board={board} />
				</div>
			</div>
			<DndContext
				sensors={sensors}
				collisionDetection={rectIntersection}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				<div className='flex flex-col gap-6 p-4 h-full pt-20'>
					<ColumnList boardId={boardId} columns={columns} />
				</div>
				<BoardDragOverlay
					activeCard={activeCard}
					activeColumn={activeColumn}
					boardId={boardId}
				/>
			</DndContext>
		</div>
	)
}
