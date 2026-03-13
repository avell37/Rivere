'use client'
import { memo } from 'react'

import { BoardSkeleton, useBoard } from '@/entities/Board'

import { DndProvider } from '@/features/drag-and-drop/ui/DndProvider'

import { useSidebar } from '@/shared/ui/external'

import { ColumnList } from '@/widgets/Kanban-board/ui/column/ColumnList'

import { BoardDragOverlay } from '../overlay/BoardDragOverlay'

import { BoardHeaderActions } from './BoardHeaderActions'

export const Board = memo(({ boardId }: { boardId: string }) => {
	const { board, isLoading, backgroundStyle } = useBoard(boardId)

	const { state } = useSidebar()

	if (!board && isLoading) return <BoardSkeleton />

	return (
		<div className={`relative h-full w-full`}>
			<div
				className='fixed top-0 left-0 w-full h-screen -z-10'
				style={backgroundStyle}
			/>
			<div className='fixed items-center px-4 py-3 w-full bg-gray-200/60 dark:bg-zinc-600/30 backdrop-blur-md z-40'>
				<div
					className={`inline-flex items-center justify-between mx-auto w-full transition-all
					${state === 'collapsed' ? 'max-w-[1900px]' : 'max-w-[1620px]'}`}
				>
					<h1 className='font-bold'>{board?.title}</h1>
					{board && <BoardHeaderActions board={board} />}
				</div>
			</div>
			<div className='flex flex-col gap-6 p-4 pt-20'>
				<DndProvider key={boardId} boardId={boardId}>
					<ColumnList boardId={boardId} />
					<BoardDragOverlay boardId={boardId} />
				</DndProvider>
			</div>
		</div>
	)
})
