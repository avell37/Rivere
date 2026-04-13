'use client'
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction } from 'react'

import { boardKeys } from '@/entities/Board'
import { IColumn } from '@/entities/Column'

import { handleApiError } from '@/shared/utils/handleApiError'

import { fetchReorderColumns } from '../api/reorderApi'
import { ReorderColumns } from '../types/ReorderPayload'

interface ColumnDndProps {
	columns: IColumn[]
	setActiveColumn: (column: IColumn | null) => void
	setColumns: Dispatch<SetStateAction<IColumn[]>>
	boardId: string
}

export const useColumnDnd = ({
	columns,
	setActiveColumn,
	setColumns,
	boardId
}: ColumnDndProps) => {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const { mutate: reorderColumns } = useMutation({
		mutationKey: ['reorder columns', boardId],
		mutationFn: ({ boardId, columns }: ReorderColumns) =>
			fetchReorderColumns({ boardId, columns }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: boardKeys.single(boardId)
			})
		},
		onError: err => handleApiError(err, t)
	})

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
