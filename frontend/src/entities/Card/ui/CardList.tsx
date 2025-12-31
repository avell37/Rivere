import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { CreateCardModal } from '@/features/card/create/ui/CreateCardModal'

import { ICard } from '../model/types/ICard'

import { Card } from './Card'

export const CardList = ({
	cards,
	columnId
}: {
	cards: ICard[]
	columnId: string
}) => {
	const { setNodeRef } = useDroppable({
		id: `column-end-${columnId}`,
		data: {
			type: 'column-end',
			columnId
		}
	})

	return (
		<div className='flex flex-col gap-4'>
			<SortableContext
				items={cards.map(card => card.id) ?? []}
				strategy={verticalListSortingStrategy}
			>
				{cards && cards.map(card => <Card key={card.id} {...card} />)}
			</SortableContext>
			<CreateCardModal columnId={columnId} />
			{cards.length === 0 && (
				<div className='h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center font-bold text-sm'>
					Перетащите карточку сюда
				</div>
			)}
			<div ref={setNodeRef} className='h-10 rounded-md' />
		</div>
	)
}
