'use client'

import { cn } from '@/shared/utils'

import { getDeadlineState } from '../model/lib/getDeadlineState'
import { ICard } from '../model/types/ICard'

import { CardPreviewContent } from './CardPreviewContent'

export const CardOverlayItem = ({
	card,
	className
}: {
	card: ICard
	className?: string
}) => {
	const deadlineState = getDeadlineState(card.deadline, card.done)

	return (
		<div
			className={cn(
				'relative bg-card text-card-foreground border border-border rounded-lg shadow-md list-none w-full shrink-0 box-border',
				'cursor-grabbing',
				card.done && 'opacity-80',
				deadlineState === 'overdue' &&
					'border-red-500/50 dark:border-red-500/40',
				deadlineState === 'due-soon' &&
					'border-orange-400/50 dark:border-orange-400/40',
				className
			)}
		>
			<div className='p-4'>
				<CardPreviewContent card={card} />
			</div>
		</div>
	)
}
