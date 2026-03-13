import {
	DndContext,
	DragEndEvent,
	DragStartEvent,
	MouseSensor,
	TouchSensor,
	rectIntersection,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import { createContext, memo, useCallback, useContext, useMemo } from 'react'

import { useBoardStore } from '@/entities/Board'

import { useCardDnd } from '../model/hooks/useCardDnd'
import { useColumnDnd } from '../model/hooks/useColumnDnd'
import {
	DndProviderProps,
	DragAndDropContextProps
} from '../model/types/DragAndDrop'

const DragAndDropContext = createContext<DragAndDropContextProps | null>(null)

export const DndProvider = memo(({ boardId, children }: DndProviderProps) => {
	const {
		columns,
		activeCard,
		activeColumn,
		setActiveColumn,
		setActiveCard,
		setColumns
	} = useBoardStore()

	const cardDragHandlers = useCardDnd({
		columns,
		setColumns,
		setActiveCard
	})

	const columnDragHandlers = useColumnDnd({
		columns,
		setActiveColumn,
		setColumns,
		boardId
	})

	const sensors = useSensors(
		useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
		useSensor(TouchSensor, {
			activationConstraint: { distance: 5, delay: 250, tolerance: 5 }
		})
	)

	const value = useMemo(
		() => ({
			columns,
			activeCard,
			activeColumn
		}),
		[columns, activeCard, activeColumn]
	)

	const handleDragStart = useCallback(
		(e: DragStartEvent) => {
			cardDragHandlers.onCardDragStart(e)
			columnDragHandlers.onColumnDragStart(e)
		},
		[cardDragHandlers.onCardDragStart, columnDragHandlers.onColumnDragStart]
	)

	const handleDragEnd = useCallback(
		(e: DragEndEvent) => {
			cardDragHandlers.onCardDragEnd(e)
			columnDragHandlers.onColumnDragEnd(e)
		},
		[cardDragHandlers.onCardDragEnd, columnDragHandlers.onColumnDragEnd]
	)

	return (
		<DragAndDropContext value={value}>
			<DndContext
				sensors={sensors}
				collisionDetection={rectIntersection}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				{children}
			</DndContext>
		</DragAndDropContext>
	)
})

export const useDragAndDrop = () => {
	const context = useContext(DragAndDropContext)

	if (!context) {
		throw new Error(
			'useDragAndDrop must be used within DragAndDropProvider'
		)
	}

	return context
}
