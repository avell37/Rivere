import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { CreateCardModal } from '@/features/card/create/ui/CreateCardModal'

import { ICard } from '../model/types/ICard'

import { Card } from './Card'

export const CardList = ({
	cards,
	columnId,
	boardId
}: {
	cards: ICard[]
	columnId: string
	boardId: string
}) => {
	const { setNodeRef } = useDroppable({
		id: `column-end-${columnId}`,
		data: {
			type: 'column-end',
			columnId
		}
	})

	return (
		<div className='flex flex-col'>
			<div ref={setNodeRef} className='flex flex-col gap-4 pb-6'>
				<SortableContext
					items={cards.map(card => card.id) ?? []}
					strategy={verticalListSortingStrategy}
				>
					{cards &&
						cards.map(card => (
							<Card key={card.id} {...card} boardId={boardId} />
						))}
				</SortableContext>
				{cards.length === 0 && (
					<div className='h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center font-bold text-sm'>
						Перетащите карточку сюда
					</div>
				)}
				<div className='rounded-md' />
			</div>
			<CreateCardModal columnId={columnId} />
		</div>
	)
}
