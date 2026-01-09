import { SquareArrowOutUpRight } from 'lucide-react'
import { useLocale } from 'next-intl'

import { formatDate } from '@/shared/libs/formattedDate'
import { priorityCircle, priorityColors } from '@/shared/libs/priorityColors'

import { ICard } from '../model/types/ICard'

export const CardOverlay = ({ card }: { card: ICard }) => {
	const locale = useLocale()
	const date = formatDate(card.deadline, locale)

	return (
		<div
			className={`relative p-6 dark:bg-neutral-900 rounded-lg shadow list-none ${priorityColors[card.priority] ?? ''}
			transition-all duration-200 cursor-grab active:cursor-grabbing w-74`}
		>
			<li>
				<div className='flex flex-col gap-2 dark:text-white wrap-break-word'>
					<h3 className='text-sm'>{card.title}</h3>
					<span className='text-xs'>{card.description}</span>
				</div>
				<div className='flex flex-col items-end justify-end gap-2 pt-4 pb-2'>
					<div className='flex gap-1'>
						<div
							className={`${priorityCircle[card.priority] ?? ''}`}
						/>
						<span className='text-xs'>
							{card.priority.toLowerCase()}
						</span>
					</div>
					<span className='text-xs'>{date}</span>
				</div>
			</li>
			<div className='cursor-pointer'>
				<SquareArrowOutUpRight size={16} />
			</div>
		</div>
	)
}
