'use client'

import { memo } from 'react'

import { useBoardPermissions } from '@/entities/Board'
import { CardPreviewContent, ICard, useCard } from '@/entities/Card'
import { getDeadlineState } from '@/entities/Card/model/lib/getDeadlineState'

import { DeleteCardModal } from '@/features/card'

import { BoardPermission, cn } from '@/shared/utils'

interface CardComponentProps {
	card: ICard

	boardId: string

	onClick: () => void
}

const CardComponent = ({ card, boardId, onClick }: CardComponentProps) => {
	const { can } = useBoardPermissions(boardId)

	const { setNodeRef, attributes, listeners, style, isDragging } = useCard({
		card
	})

	const deadlineState = getDeadlineState(card.deadline, card.done)

	return (
		<li
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={cn(
				'relative bg-card text-card-foreground border border-border rounded-lg shadow-sm list-none w-full shrink-0 box-border',

				'transition-all duration-200 cursor-grab active:cursor-grabbing',

				isDragging
					? 'opacity-0 pointer-events-none'
					: card.done
						? 'opacity-80'
						: '',

				deadlineState === 'overdue' &&
					'border-red-500/50 dark:border-red-500/40',

				deadlineState === 'due-soon' &&
					'border-orange-400/50 dark:border-orange-400/40'
			)}
		>
			<div className='p-4' onClick={onClick}>
				<CardPreviewContent card={card} boardId={boardId} />
			</div>

			{can(BoardPermission.DELETE_CARD) && (
				<DeleteCardModal cardId={card.id} boardId={boardId} />
			)}
		</li>
	)
}

export const Card = memo(CardComponent)
