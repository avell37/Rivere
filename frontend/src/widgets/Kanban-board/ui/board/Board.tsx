'use client'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { memo } from 'react'

import { BoardSkeleton, useBoard } from '@/entities/Board'
import { useBoardItem } from '@/entities/Board/model/hooks/useBoardItem'

import { DndProvider } from '@/features/drag-and-drop/ui/DndProvider'

import { ColumnList } from '@/widgets/Kanban-board/ui/column/ColumnList'

import { BoardDragOverlay } from '../overlay/BoardDragOverlay'

import { BoardHeaderActions } from './BoardHeaderActions'

export const Board = memo(({ boardId }: { boardId: string }) => {
	const { board, isLoading } = useBoard(boardId)
	const { backgroundStyle } = useBoardItem(board?.background)

	if (!board && isLoading) return <BoardSkeleton />

	return (
		<div
			className='relative w-full h-full flex flex-col'
			style={backgroundStyle}
		>
			<div className='px-4 py-3 bg-gray-200/60 dark:bg-zinc-600/30 backdrop-blur-md'>
				<div className='flex items-center justify-between'>
					<h1 className='font-bold'>{board?.title}</h1>
					{board && <BoardHeaderActions board={board} />}
				</div>
			</div>
			<ScrollArea.Root className='flex-1 overflow-hidden'>
				<ScrollArea.Viewport className='w-full h-full'>
					<div className='flex gap-6 p-4 h-full'>
						<DndProvider key={boardId} boardId={boardId}>
							<ColumnList boardId={boardId} />
							<BoardDragOverlay boardId={boardId} />
						</DndProvider>
					</div>
				</ScrollArea.Viewport>
				<ScrollArea.Scrollbar orientation='horizontal' className='h-2'>
					<ScrollArea.Thumb className='bg-white/60 h-2! rounded-lg' />
				</ScrollArea.Scrollbar>
			</ScrollArea.Root>
		</div>
	)
})
