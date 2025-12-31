'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'

import { ICard } from '@/entities/Card/model/types/ICard'
import { CardList } from '@/entities/Card/ui/CardList'

import { DeleteColumnModal } from '@/features/column/delete/ui/DeleteColumnModal'
import { EditColumnModal } from '@/features/column/edit/ui/EditColumnModal'
import { useDndStore } from '@/features/drag-and-drop/model/store/useDndStore'

interface ColumnProps {
	id: string
	title: string
	cards: ICard[]
}

export const Column = ({ id, title, cards }: ColumnProps) => {
	const { hoveredColumnId } = useDndStore()
	const {
		attributes,
		listeners,
		setNodeRef: setSortableRef,
		transform,
		transition,
		isDragging
	} = useSortable({
		id,
		data: {
			type: 'column',
			column: {
				id,
				title,
				cards
			}
		}
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}

	return (
		<div
			ref={setSortableRef}
			style={style}
			className={`w-76 flex flex-col gap-3 break-all
				${isDragging ? 'opacity-70' : ''} 
				${hoveredColumnId === id ? 'bg-neutral-900/20 dark:bg-neutral-900/20 rounded-lg' : ''}`}
		>
			<div className='dark:bg-neutral-900 p-4 rounded-lg shadow flex justify-between gap-2 dark:text-white'>
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
					<EditColumnModal columnId={id} />
					<DeleteColumnModal columnId={id} />
				</div>
			</div>
			<CardList cards={cards} columnId={id} />
		</div>
	)
}
