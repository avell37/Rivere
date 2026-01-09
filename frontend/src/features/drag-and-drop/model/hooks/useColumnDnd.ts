import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { handleApiError } from '@/shared/utils/handleApiError'

import { fetchReorderColumns } from '../api/reorderApi'
import { useDndStore } from '../store/useDndStore'

interface ColumnDndProps {
	boardId: string
}

export const useColumnDnd = ({ boardId }: ColumnDndProps) => {
	const t = useTranslations()
	const queryClient = useQueryClient()
	const { columns, setColumns, setActiveColumn, setActiveCard } =
		useDndStore()

	const reorderColumns = useMutation({
		mutationKey: ['reorder columns', boardId],
		mutationFn: ({
			boardId,
			columns
		}: {
			boardId: string
			columns: string[]
		}) => fetchReorderColumns({ boardId, columns }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get board', boardId] })
		},
		onError: err => handleApiError(err, t)
	})

	const getOverColumnId = (over: DragEndEvent['over']) => {
		if (!over?.data.current) return null

		const { type } = over.data.current

		if (type === 'column') {
			return over.data.current.column.id
		} else if (type === 'card') {
			return over.data.current.card.columnId
		} else if (type === 'column-end') {
			return over.data.current.columnId
		}

		return null
	}

	const onColumnDragStart = ({ active }: DragStartEvent) => {
		setActiveCard(null)
		if (!active || active.data.current?.type !== 'column') return
		setActiveColumn(active.data.current.column)
	}

	const onColumnDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event

		setActiveColumn(null)

		if (!over) return

		const activeId = active.data.current?.column.id
		const overId = getOverColumnId(over)

		if (!activeId || !overId || activeId === overId) return

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

	return {
		onColumnDragStart,
		onColumnDragEnd
	}
}
