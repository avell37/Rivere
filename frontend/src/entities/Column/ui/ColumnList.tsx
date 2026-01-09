import {
	SortableContext,
	horizontalListSortingStrategy
} from '@dnd-kit/sortable'

import { CreateColumnModal } from '@/features/column/create/ui/CreateColumnModal'

import { IColumn } from '../model/types/IColumn'

import { Column } from './Column'

export const ColumnList = ({
	boardId,
	columns
}: {
	boardId: string
	columns: IColumn[]
}) => {
	return (
		<div className='flex gap-6 overflow-auto'>
			<SortableContext
				items={columns.map((column: IColumn) => column.id) ?? []}
				strategy={horizontalListSortingStrategy}
			>
				{columns?.map((column: IColumn) => (
					<Column
						key={column.id}
						id={column.id}
						title={column.title}
						cards={column.cards}
						boardId={column.boardId}
					/>
				))}
			</SortableContext>
			<CreateColumnModal boardId={boardId} />
		</div>
	)
}
