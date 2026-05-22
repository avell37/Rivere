'use client'
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { ColumnDndProps } from '../types/DragAndDrop'

import { useReorderColumnsMutation } from './useDndQueries'

export const useColumnDnd = ({
	columns,
	setActiveColumn,
	setColumns,
	boardId
}: ColumnDndProps) => {
	const { reorderColumns } = useReorderColumnsMutation(boardId)

	const onColumnDragStart = ({ active }: DragStartEvent) => {
		if (!active || active.data.current?.type !== 'column') return
		const column = columns.find(col => col.id === active.id)
		if (column) setActiveColumn(column)
	}

	const onColumnDragEnd = ({ active, over }: DragEndEvent) => {
		setActiveColumn(null)

		if (!active || !over || active.data.current?.type !== 'column') return

		const activeColumnIndex = columns.findIndex(col => col.id === active.id)
		const overColumnIndex = columns.findIndex(col => col.id === over.id)

		if (activeColumnIndex === overColumnIndex) return

		const updatedColumns = arrayMove(
			columns,
			activeColumnIndex,
			overColumnIndex
		)

		setColumns(updatedColumns)
		reorderColumns({ boardId, columns: updatedColumns.map(col => col.id) })
	}

	return {
		onColumnDragStart,
		onColumnDragEnd
	}
}
