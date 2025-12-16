import { DragOverlay } from '@dnd-kit/core'

import { ICard } from '@/entities/Card/model/types/ICard'
import { CardOverlay } from '@/entities/Card/ui/CardOverlay'
import { IColumn } from '@/entities/Column/model/types/IColumn'
import { ColumnOverlay } from '@/entities/Column/ui/ColumnOverlay'

interface BoardDragOverlayProps {
	activeColumn: IColumn | null
	activeCard: ICard | null
}

export const BoardDragOverlay = ({
	activeCard,
	activeColumn
}: BoardDragOverlayProps) => {
	return (
		<DragOverlay adjustScale={false}>
			{activeCard ? (
				<div className=''>
					<CardOverlay card={activeCard} />
				</div>
			) : null}
			{activeColumn ? (
				<div className='w-80'>
					<ColumnOverlay column={activeColumn} />
				</div>
			) : null}
		</DragOverlay>
	)
}
