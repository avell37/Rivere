'use client'
import { DndContext, rectIntersection } from '@dnd-kit/core'

import { ColumnList } from '@/entities/Column'

import { useDndStore } from '@/features/drag-and-drop'

import { useSidebar } from '@/shared/ui/external'

import { useBoard } from '../model/hooks/useBoard'
import { useBoardDndHandlers } from '../model/hooks/useBoardDndHandlers'

import { BoardDragOverlay } from './BoardDragOverlay'
import { BoardHeaderActions } from './BoardHeaderActions'
import { BoardViewSkeleton } from './BoardViewSkeleton'

export const BoardView = ({ boardId }: { boardId: string }) => {
	const { columns, board, isLoading, backgroundStyle, sensors } =
		useBoard(boardId)
	const { handleDragStart, handleDragEnd } = useBoardDndHandlers({ boardId })

	const { activeCard, activeColumn } = useDndStore()
	const { state } = useSidebar()

	if (isLoading || !board) return <BoardViewSkeleton />

	return (
		<div className={`relative h-full w-full`}>
			<div
				className='fixed top-0 left-0 w-full h-screen -z-10'
				style={backgroundStyle}
			/>
			<div className='fixed items-center px-4 py-3 w-full bg-gray-200/60 dark:bg-zinc-600/30 backdrop-blur-md z-100'>
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
				<div className='flex flex-col gap-6 p-4 pt-20'>
					<ColumnList boardId={boardId} columns={columns} />
				</div>
				<BoardDragOverlay
					boardId={boardId}
					activeCard={activeCard}
					activeColumn={activeColumn}
				/>
			</DndContext>
		</div>
	)
}
