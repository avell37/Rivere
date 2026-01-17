import { GripVertical, MoreHorizontal } from 'lucide-react'

import { CardList } from '@/entities/Card'

import { ColumnOverlayProps } from '../model/types/ColumnProps'

export const ColumnOverlay = ({ column, boardId }: ColumnOverlayProps) => {
	return (
		<ul className='w-76 flex flex-col gap-3 break-all'>
			<div className='bg-background dark:bg-neutral-900 p-4 rounded-lg shadow flex justify-between dark:text-white'>
				<div className='flex items-center gap-2'>
					<GripVertical className='size-5 outline-none cursor-grab' />
					<h2 className='text-lg font-semibold'>{column.title}</h2>
					<span className='text-sm text-gray-500'>
						{column.cards.length}
					</span>
				</div>
				<div className='flex items-center gap-2'>
					<MoreHorizontal size={16} />
				</div>
			</div>
			<CardList
				cards={column.cards}
				columnId={column.id}
				boardId={boardId}
			/>
		</ul>
	)
}
