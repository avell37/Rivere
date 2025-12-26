import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { fetchReorderColumns } from '../api/reorderApi'
import { useDndStore } from '../store/useDndStore'

interface ColumnDndProps {
	boardId: string
}

export const useColumnDnd = ({ boardId }: ColumnDndProps) => {
	const {
		columns,
		setColumns,
		setActiveColumn,
		setHoveredColumnId,
		setActiveCard
	} = useDndStore()

	const reorderColumns = useMutation({
		mutationKey: ['reorder columns', boardId],
		mutationFn: ({
			boardId,
			columns
		}: {
			boardId: string
			columns: string[]
		}) => fetchReorderColumns({ boardId, columns }),
		onError: err => {
			toast.error('Ошибка при перемещении колонки')
		}
	})

	const onColumnDragStart = ({ active }: DragStartEvent) => {
		setActiveCard(null)
		if (!active || active.data.current?.type !== 'column') return
		setActiveColumn(active.data.current.column)
	}

	const onColumnDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event

		setHoveredColumnId(null)

		if (!over) {
			setActiveColumn(null)
			return
		}

		const activeId = active.data.current?.column.id
		const overId = over.data.current?.column.id

		if (activeId === overId) {
			setActiveColumn(null)
			return
		}

		const oldIndex = columns.findIndex(col => col.id === activeId)
		const newIndex = columns.findIndex(col => col.id === overId)

		if (oldIndex === -1 || newIndex === -1) return

		const newOrder = arrayMove(columns, oldIndex, newIndex)

		const orderWithPositions = newOrder.map((col, i) => ({
			...col,
			position: i + 1
		}))

		setColumns(orderWithPositions)

		reorderColumns.mutate({
			boardId,
			columns: newOrder.map(col => col.id)
		})
	}

	const onColumnDragOver = (event: DragOverEvent) => {
		const { over } = event

		if (!over) {
			setHoveredColumnId(null)
			return
		}

		const data = over.data.current

		if (!data) {
			setHoveredColumnId(null)
			return
		}

		const overType = over.data.current?.type

		if (overType === 'column') {
			setHoveredColumnId(data.column.id)
		}

		if (overType === 'card') {
			setHoveredColumnId(data.card.columnId)
		}
	}

	return {
		onColumnDragStart,
		onColumnDragEnd,
		onColumnDragOver
	}
}
