'use client'

import { AlertCircle, Check, Clock, MessageSquareMore } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { priorityColors } from '@/shared/config'
import { S3_URL } from '@/shared/libs'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Tooltip,
	TooltipContent,
	TooltipTrigger
} from '@/shared/ui/external'
import { cn, formatDate, formatPriority } from '@/shared/utils'

import { getDeadlineState } from '../model/lib/getDeadlineState'
import { CardPreviewContentProps } from '../model/types/CardProps'

import { CardDoneButton } from './CardDoneButton'

export const CardPreviewContent = ({
	card,
	boardId
}: CardPreviewContentProps) => {
	const t = useTranslations()
	const locale = useLocale()
	const deadlineState = getDeadlineState(card.deadline, card.done)

	return (
		<div className='relative flex flex-col gap-2 text-card-foreground wrap-break-word'>
			<div className='flex items-center gap-1.5'>
				{boardId ? (
					<CardDoneButton
						cardId={card.id}
						done={card.done}
						boardId={boardId}
						className='w-4 h-4 shrink-0'
					/>
				) : (
					<div
						className={cn(
							'flex justify-center items-center rounded-full w-4 h-4 shrink-0',
							card.done ? 'bg-green-500' : 'border border-border'
						)}
					>
						{card.done && <Check className='size-3 text-white' />}
					</div>
				)}
				<h3 className='text-xs'>{card.title}</h3>
			</div>
			<span className='text-xs wrap-break-word whitespace-pre-wrap'>
				{card.description?.trim()}
			</span>
			<div className='flex flex-wrap items-center gap-2'>
				{card.tags?.map(tag => (
					<span
						key={tag.id}
						className='inline-flex items-center rounded px-2 py-0.5 text-[10px] font-medium text-white border-0'
						style={{ backgroundColor: tag.background }}
					>
						{tag.title}
					</span>
				))}
				<div
					className={`${priorityColors[card.priority]} inline-flex items-center w-fit px-2 py-0.5 rounded text-[10px] font-medium`}
				>
					{formatPriority(card.priority)}
				</div>
				<div className='flex items-center gap-1 text-[10px]'>
					<MessageSquareMore className='size-3' />
					{card?.chat?._count?.messages}
				</div>
				{card.assignee && (
					<Tooltip>
						<TooltipTrigger asChild>
							<Avatar className='size-5 rounded-full cursor-default'>
								<AvatarImage
									src={`${S3_URL}${card.assignee.avatar}`}
									alt={card.assignee.nickname}
								/>
								<AvatarFallback className='text-[9px]'>
									{card.assignee.nickname
										.slice(0, 2)
										.toUpperCase()}
								</AvatarFallback>
							</Avatar>
						</TooltipTrigger>
						<TooltipContent side='top'>
							{card.assignee.nickname}
						</TooltipContent>
					</Tooltip>
				)}
			</div>
			{card.deadline && (
				<span
					className={cn(
						'absolute bottom-0 right-0 flex items-center gap-1 text-[10px]',
						deadlineState === 'overdue' &&
							'text-red-500 font-medium',
						deadlineState === 'due-soon' && 'text-orange-400'
					)}
				>
					{deadlineState === 'overdue' ? (
						<AlertCircle size={12} />
					) : (
						<Clock size={12} />
					)}
					{deadlineState === 'overdue'
						? t('card.overdue')
						: t('card.expiresAt', {
								date: formatDate(card.deadline, locale)
							})}
				</span>
			)}
		</div>
	)
}
