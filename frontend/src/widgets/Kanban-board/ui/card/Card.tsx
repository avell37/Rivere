'use client'
import { Clock, MessageSquareMore } from 'lucide-react'
import { memo } from 'react'

import { CardDoneButton, ICard, useCard } from '@/entities/Card'

import { DeleteCardModal } from '@/features/card'

import { priorityColors } from '@/shared/config'
import { formatDate, formatPriority } from '@/shared/utils'

interface props {
	card: ICard
	boardId: string
	onClick: () => void
}

export const Card = memo(({ card, boardId, onClick }: props) => {
	const { setNodeRef, attributes, listeners, style, isDragging } = useCard({
		card
	})

	return (
		<li
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={`relative bg-white dark:bg-neutral-900 border rounded-lg shadow list-none
			${isDragging ? 'opacity-0' : null} transition-all duration-200 cursor-grab active:cursor-grabbing
			${card.done && 'opacity-80'}`}
		>
			<div className='p-4' onClick={onClick}>
				<div className='relative flex flex-col gap-2 dark:text-white wrap-break-word'>
					<div className='flex items-center gap-1.5'>
						<CardDoneButton
							cardId={card.id}
							done={card.done}
							boardId={boardId}
							className='w-4 h-4'
						/>
						<h3 className='text-xs'>{card.title}</h3>
					</div>
					<span className='text-xs wrap-break-word whitespace-pre-wrap'>
						{card.description}
					</span>
					<div className='flex items-center gap-2'>
						<div
							className={`${priorityColors[card.priority]} inline-flex items-center w-fit 
						px-2 py-0.5 rounded text-[10px] font-medium`}
						>
							{formatPriority(card.priority)}
						</div>
						<div className='flex items-center gap-1 text-[10px]'>
							<MessageSquareMore className='size-3' />
							{card?.chat?._count?.messages}
						</div>
					</div>
					{card.deadline && (
						<span className='absolute bottom-0 right-0 flex items-center gap-1 text-[10px]'>
							<Clock size={14} className='' />
							до: {formatDate(card.deadline)}
						</span>
					)}
				</div>
			</div>
			<DeleteCardModal cardId={card.id} boardId={boardId} />
		</li>
	)
})
