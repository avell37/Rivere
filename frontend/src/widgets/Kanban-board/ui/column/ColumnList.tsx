'use client'
import {
	SortableContext,
	horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { memo, useMemo } from 'react'

import { ColumnListProps, IColumn } from '@/entities/Column'

import { CreateColumnModal } from '@/features/column'
import { useDragAndDrop } from '@/features/drag-and-drop/ui/DndProvider'

import { Column } from './Column'

export const ColumnList = memo(({ boardId }: ColumnListProps) => {
	const { columns } = useDragAndDrop()

	const columnIds = useMemo(() => columns?.map(col => col.id), [columns])

	return (
		<SortableContext
			items={columnIds || []}
			strategy={horizontalListSortingStrategy}
		>
			<ul className='flex gap-6 overflow-auto items-start'>
				{columns?.map((column: IColumn) => (
					<Column key={column.id} column={column} />
				))}
				<li>
					<CreateColumnModal boardId={boardId} />
				</li>
			</ul>
		</SortableContext>
	)
})
