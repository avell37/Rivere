'use client'

import { GripVertical } from 'lucide-react'

import { CardList } from '@/entities/Card'

import { useColumn } from '../model/hooks/useColumn'
import { ColumnProps } from '../model/types/ColumnProps'

import { ColumnActions } from './ColumnActions'

export const Column = ({ id, title, cards, boardId }: ColumnProps) => {
	const { attributes, listeners, setNodeRef, style, isDragging, isOver } =
		useColumn({ id, title, cards })

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={`w-76 flex flex-col gap-3 break-all
				${isDragging ? 'opacity-70' : ''} 
				${isOver && 'bg-neutral-200/50 dark:bg-neutral-900/20 rounded-lg'}`}
		>
			<div className='bg-white dark:bg-neutral-900 p-4 rounded-lg shadow flex justify-between gap-2 dark:text-white'>
				<div className='flex items-center gap-2'>
					<GripVertical
						{...attributes}
						{...listeners}
						className='size-5 outline-none cursor-grab'
					/>
					<h2 className='text-lg font-semibold'>{title}</h2>
					<span className='text-sm text-gray-500'>
						{cards.length}
					</span>
				</div>
				<div className='flex items-center gap-2'>
					<ColumnActions columnId={id} boardId={boardId} />
				</div>
			</div>
			<CardList cards={cards} columnId={id} boardId={boardId} />
		</div>
	)
}
