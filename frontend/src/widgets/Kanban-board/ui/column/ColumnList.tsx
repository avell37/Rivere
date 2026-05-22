'use client'
import {
	SortableContext,
	horizontalListSortingStrategy
} from '@dnd-kit/sortable'
import { memo, useMemo } from 'react'

import { IColumn } from '@/entities/Column'

import { CreateColumnModal } from '@/features/column'
import { useDragAndDrop } from '@/features/drag-and-drop'

import { Column } from './Column'

const ColumnListComponent = ({ boardId }: { boardId: string }) => {
	const { columns } = useDragAndDrop()

	const columnIds = useMemo(() => columns?.map(col => col.id), [columns])

	return (
		<SortableContext
			items={columnIds || []}
			strategy={horizontalListSortingStrategy}
		>
			<ul className='flex gap-10'>
				{columns?.map((column: IColumn) => (
					<Column key={column.id} column={column} />
				))}
				<li>
					<CreateColumnModal boardId={boardId} />
				</li>
			</ul>
		</SortableContext>
	)
}

export const ColumnList = memo(ColumnListComponent)
