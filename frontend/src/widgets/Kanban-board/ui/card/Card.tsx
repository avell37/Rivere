'use client'
import { AlertCircle, Clock, MessageSquareMore } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { memo } from 'react'

import { useBoardPermissions } from '@/entities/Board'
import { CardDoneButton, ICard, useCard } from '@/entities/Card'
import { getDeadlineState } from '@/entities/Card/model/lib/getDeadlineState'

import { DeleteCardModal } from '@/features/card'

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
import { BoardPermission, cn, formatDate, formatPriority } from '@/shared/utils'

interface CardComponentProps {
	card: ICard
	boardId: string
	onClick: () => void
}

const CardComponent = ({ card, boardId, onClick }: CardComponentProps) => {
	const t = useTranslations()
	const locale = useLocale()
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
				'relative bg-white dark:bg-neutral-900 border rounded-lg shadow list-none w-full shrink-0 box-border',
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
						{card.description?.trim()}
					</span>
					<div className='flex flex-wrap items-center gap-2'>
						{card.tags?.map(tag => (
							<span
								key={tag.id}
								className='inline-flex items-center rounded px-2 py-0.5 text-[10px] font-medium text-white'
								style={{ backgroundColor: tag.background }}
							>
								{tag.title}
							</span>
						))}
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
						{card.assignee && (
							<Tooltip>
								<TooltipTrigger asChild>
									<Avatar className='size-5 rounded-full cursor-pointer'>
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
								deadlineState === 'due-soon' &&
									'text-orange-400'
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
			</div>
			{can(BoardPermission.DELETE_CARD) && (
				<DeleteCardModal cardId={card.id} boardId={boardId} />
			)}
		</li>
	)
}

export const Card = memo(CardComponent)
