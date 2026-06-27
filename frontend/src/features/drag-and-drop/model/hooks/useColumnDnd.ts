'use client'
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useCallback } from 'react'

import { useBoardStore } from '@/entities/Board'

import { ColumnDndProps } from '../types/DragAndDrop'

import { useReorderColumnsMutation } from './useDndQueries'

export const useColumnDnd = ({
	setActiveColumn,
	setColumns,
	boardId
}: ColumnDndProps) => {
	const { reorderColumns } = useReorderColumnsMutation(boardId)

	const onColumnDragStart = useCallback(
		({ active }: DragStartEvent) => {
			if (!active || active.data.current?.type !== 'column') return

			const column = useBoardStore
				.getState()
				.columns.find(col => col.id === active.id)

			if (column) setActiveColumn(column)
		},
		[setActiveColumn]
	)

	const onColumnDragEnd = useCallback(
		({ active, over }: DragEndEvent) => {
			setActiveColumn(null)

			if (!over || active.data.current?.type !== 'column') return
			if (active.id === over.id) return

			const columns = useBoardStore.getState().columns
			const activeColumnIndex = columns.findIndex(col => col.id === active.id)
			const overColumnIndex = columns.findIndex(col => col.id === over.id)

			if (activeColumnIndex === -1 || overColumnIndex === -1) return
			if (activeColumnIndex === overColumnIndex) return

			const updatedColumns = arrayMove(
				columns,
				activeColumnIndex,
				overColumnIndex
			)

			setColumns(updatedColumns)
			reorderColumns({ boardId, columns: updatedColumns.map(col => col.id) })
		},
		[boardId, reorderColumns, setActiveColumn, setColumns]
	)

	return {
		onColumnDragStart,
		onColumnDragEnd
	}
}
