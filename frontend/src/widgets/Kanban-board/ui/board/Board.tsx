'use client'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { memo } from 'react'

import { BoardSkeleton, useBoard, useBoardItem } from '@/entities/Board'

import { DndProvider } from '@/features/drag-and-drop'

import { ColumnList } from '../column/ColumnList'
import { BoardDragOverlay } from '../overlay/BoardDragOverlay'

import { BoardHeaderActions } from './BoardHeaderActions'

const BoardComponent = ({ boardId }: { boardId: string }) => {
	const { board, boardPending } = useBoard(boardId)
	const { backgroundStyle } = useBoardItem(board?.background)

	if (!board && boardPending) return <BoardSkeleton />

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
							<BoardDragOverlay />
						</DndProvider>
					</div>
				</ScrollArea.Viewport>
				<ScrollArea.Scrollbar orientation='horizontal' className='h-2'>
					<ScrollArea.Thumb className='bg-white/60 h-2! rounded-lg' />
				</ScrollArea.Scrollbar>
			</ScrollArea.Root>
		</div>
	)
}

export const Board = memo(BoardComponent)
