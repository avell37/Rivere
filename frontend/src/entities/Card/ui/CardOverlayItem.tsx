'use client'
import { Check, Clock, MessageSquareMore, X } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { priorityColors } from '@/shared/config'
import { cn, formatDate, formatPriority } from '@/shared/utils'

import { ICard } from '../model/types/ICard'

export const CardOverlayItem = ({ card }: { card: ICard }) => {
	const t = useTranslations()
	const locale = useLocale()

	return (
		<div
			className={`relative bg-background dark:bg-neutral-900 border rounded-lg shadow list-none}
			transition-all duration-200 cursor-grab active:cursor-grabbing`}
		>
			<div className='p-4'>
				<div className='relative flex flex-col gap-2 dark:text-white wrap-break-word'>
					<div className='flex items-center gap-1.5'>
						<div
							className={cn(
								'flex justify-center items-center rounded-full w-4 h-4',
								card.done
									? 'bg-green-500'
									: 'border border-gray-600'
							)}
						>
							{card.done && <Check className='size-3' />}
						</div>
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
							{t('card.expiresAt', {
								date: formatDate(card.deadline, locale)
							})}
						</span>
					)}
				</div>
			</div>
			<div className='absolute top-4 right-4 cursor-pointer'>
				<X size={16} />
			</div>
		</div>
	)
}
