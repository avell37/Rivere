'use client'

import * as ScrollArea from '@radix-ui/react-scroll-area'
import { memo, useMemo } from 'react'

import { ColumnProps, useColumn } from '@/entities/Column'

import { CreateCardModal } from '@/features/card'

import { CardList } from '../card/CardList'

import { ColumnActions } from './ColumnActions'

const ColumnComponent = ({ column }: ColumnProps) => {
	const { attributes, listeners, setNodeRef, style, isDragging } = useColumn({
		id: column.id
	})
	const columnCards = useMemo(
		() => column.cards.filter(c => c && c.columnId === column.id),
		[column.cards, column.id]
	)

	return (
		<div className='flex flex-col justify-between space-y-6 gap-4'>
			<li
				ref={setNodeRef}
				style={style}
				className={`relative w-78 flex p-2 flex-col gap-1 break-all bg-white/70 dark:bg-neutral-900 rounded-md
				${isDragging ? 'opacity-70 border border-rose-500' : null}`}
			>
				<div
					{...attributes}
					{...listeners}
					className='relative p-2 flex justify-center gap-2 dark:text-white cursor-grab'
				>
					<div className='flex justify-center items-center gap-2'>
						<h2 className='text-lg font-semibold'>
							{column.title}
						</h2>
						<span className='text-sm text-gray-500'>
							{column.cards?.length ?? 0}
						</span>
					</div>
					<div className='absolute right-2 top-3'>
						<ColumnActions
							columnId={column.id}
							boardId={column.boardId}
						/>
					</div>
				</div>
				<ScrollArea.Root className='relative px-1'>
					<ScrollArea.Viewport className='flex flex-col gap-2 max-h-150 h-full overflow-y-auto'>
						<div className='flex flex-col gap-2 rounded-lg'>
							<CardList
								cards={columnCards}
								boardId={column.boardId}
							/>
						</div>
					</ScrollArea.Viewport>
					<ScrollArea.Scrollbar
						orientation='vertical'
						className='absolute right-20 top-0 bottom-0 w-2 translate-x-full'
					>
						<ScrollArea.Thumb className='block w-full bg-white/60 rounded-full' />
					</ScrollArea.Scrollbar>
				</ScrollArea.Root>
				<CreateCardModal
					columnId={column.id}
					boardId={column.boardId}
				/>
			</li>
		</div>
	)
}

export const Column = memo(ColumnComponent)
