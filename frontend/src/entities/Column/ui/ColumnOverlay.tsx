import { GripVertical } from 'lucide-react'

import { CardList } from '@/entities/Card/ui/CardList'

import { IColumn } from '../model/types/IColumn'

export const ColumnOverlay = ({ column }: { column: IColumn }) => {
	return (
		<ul className='w-74 flex flex-col gap-3 break-all'>
			<div className='dark:bg-neutral-900 p-4 rounded-lg shadow flex items-center gap-2 dark:text-white'>
				<GripVertical className='size-5 outline-none cursor-grab' />
				<h2 className='text-lg font-semibold'>{column.title}</h2>
				<span className='text-sm text-gray-500'>
					{column.cards.length}
				</span>
			</div>
			<CardList cards={column.cards} columnId={column.id} />
		</ul>
	)
}
