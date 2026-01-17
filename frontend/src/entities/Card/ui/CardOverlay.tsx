import { Check, SquareArrowOutUpRight, X } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import {
	priorityCircle,
	priorityColors,
	priorityOptions
} from '@/shared/config'
import { Button } from '@/shared/ui/external'
import { cn, formatDate } from '@/shared/utils'

import { ICard } from '../model/types/ICard'

export const CardOverlay = ({ card }: { card: ICard }) => {
	const tPriority = useTranslations('priority')
	const priorityConfig = priorityOptions[card.priority]
	const locale = useLocale()
	const date = formatDate(card.deadline, locale)

	return (
		<div
			className={`relative p-6 bg-background dark:bg-neutral-900 rounded-lg shadow list-none ${priorityColors[card.priority] ?? ''}
			transition-all duration-200 cursor-grab active:cursor-grabbing w-76`}
		>
			<li>
				<div className='flex flex-col gap-2 dark:text-white wrap-break-word'>
					<div className='flex items-center gap-2'>
						<Button
							variant='none'
							size='none'
							className={cn(
								'rounded-full w-4.5 h-4.5',
								card.done
									? 'bg-green-500'
									: 'border border-gray-600'
							)}
						>
							{card.done && <Check size={16} />}
						</Button>
						<h3 className='text-sm'>{card.title}</h3>
					</div>
					{card.description && (
						<span className='text-xs'>{card.description}</span>
					)}
				</div>
				<div className='flex flex-col items-end justify-end gap-2 pt-4 pb-2'>
					<div className='flex gap-1'>
						<div
							className={`${priorityCircle[card.priority] ?? ''}`}
						/>
						<span className='text-xs'>
							{tPriority(priorityConfig.i18nKey)}
						</span>
					</div>
					<span className='text-xs'>{date}</span>
				</div>
			</li>
			<Button
				className='absolute top-4 right-4 cursor-pointer'
				type='button'
				size='none'
				variant='none'
			>
				<X />
			</Button>
			<div className='cursor-pointer'>
				<SquareArrowOutUpRight size={16} />
			</div>
		</div>
	)
}
