import {
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { fetchBoardById } from '@/entities/Board/model/api/boardApi'
import { IColumn } from '@/entities/Column/model/types/IColumn'

import { useDndStore } from '@/features/drag-and-drop'

export const useBoard = (boardId: string) => {
	const { columns, setColumns } = useDndStore()

	const { data: board, isLoading } = useQuery({
		queryKey: ['get board', boardId],
		queryFn: () => fetchBoardById(boardId),
		enabled: !!boardId
	})

	useEffect(() => {
		if (board?.columns) {
			setColumns([
				...board.columns.sort(
					(a: IColumn, b: IColumn) => a.position - b.position
				)
			])
		}
	}, [board, setColumns])

	const backgroundStyle: React.CSSProperties = board?.background
		? board.background.url
			? {
					backgroundImage: `url(${board.background.url})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat'
				}
			: board.background.color?.includes('gradient')
				? {
						backgroundImage: board.background.color,
						backgroundSize: 'cover',
						backgroundPosition: 'center'
					}
				: { backgroundColor: board.background.color }
		: {}

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 5 }
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	return {
		board,
		columns,
		isLoading,
		backgroundStyle,
		sensors
	}
}
