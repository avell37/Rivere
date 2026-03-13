'use client'

import { memo, useMemo } from 'react'

import { ColumnProps, useColumn } from '@/entities/Column'

import { CreateCardModal } from '@/features/card'

import { CardList } from '../card/CardList'

import { ColumnActions } from './ColumnActions'

export const Column = memo(({ column }: ColumnProps) => {
	const { attributes, listeners, setNodeRef, style, isDragging } = useColumn({
		id: column.id
	})
	const columnCards = useMemo(
		() => column.cards.filter(c => c && c.columnId === column.id),
		[column.cards, column.id]
	)

	return (
		<li
			ref={setNodeRef}
			style={style}
			className={`w-76 flex flex-col gap-3 break-all bg-white/70 dark:bg-neutral-900 p-2 rounded-md
				${isDragging ? 'opacity-70 border border-rose-500' : null}`}
		>
			<div
				{...attributes}
				{...listeners}
				className='relative p-2 flex justify-center gap-2 dark:text-white cursor-grab'
			>
				<div className='flex justify-center items-center gap-2'>
					<h2 className='text-lg font-semibold'>{column.title}</h2>
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
			<div className='flex flex-col gap-2 rounded-lg'>
				<CardList cards={columnCards} boardId={column.boardId} />
				<CreateCardModal
					columnId={column.id}
					boardId={column.boardId}
				/>
			</div>
		</li>
	)
})
