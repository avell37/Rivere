'use client'
import { DndContext } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'

import { IColumn } from '@/entities/Column/model/types/IColumn'
import { Column } from '@/entities/Column/ui/Column'

import { useBoard } from '../model/hooks/useBoard'

interface BoardViewProps {
	id: string
}

export const BoardView = ({ id }: BoardViewProps) => {
	const { data: board, isLoading } = useBoard(id)

	if (isLoading || !board) return <div>Loading...</div>

	console.log(board)
	const backgroundStyle: React.CSSProperties = {}

	if (board?.background?.color)
		backgroundStyle.backgroundColor = board?.background?.color
	if (board?.background?.url) {
		backgroundStyle.backgroundImage = `url(${board?.background?.url})`
		backgroundStyle.backgroundSize = 'cover'
		backgroundStyle.backgroundPosition = 'center'
	}

	return (
		<DndContext>
			<div
				className={`flex flex-col gap-6 p-4 h-full`}
				style={backgroundStyle}
			>
				<h1 className='font-bold'>{board?.title}</h1>
				<div className='flex gap-4'>
					<SortableContext
						items={
							board?.columns.map(
								(column: IColumn) => column.id
							) ?? []
						}
					>
						{board?.columns?.map((column: IColumn) => (
							<Column
								key={column.id}
								id={column.id}
								title={column.title}
								cards={column.cards}
							/>
						))}
					</SortableContext>
				</div>
			</div>
		</DndContext>
	)
}
