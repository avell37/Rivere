'use client'

import { SquareArrowOutUpRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { DeleteCardModal } from '@/features/card'

import { priorityCircle, priorityColors } from '@/shared/config'
import { Modal } from '@/shared/ui/custom'
import { formatDate } from '@/shared/utils'

import { useCard } from '../model/hooks/useCard'
import { CardProps } from '../model/types/CardProps'

import { CardDoneButton } from './CardDoneButton'
import { CardModal } from './CardModal'

interface CardPropsWithBoardId extends CardProps {
	boardId: string
}

export const Card = (props: CardPropsWithBoardId) => {
	const { id, title, description, priority, deadline, done, boardId } = props
	const t = useTranslations('card')
	const tPriority = useTranslations('priority')
	const locale = useLocale()

	const {
		setNodeRef,
		attributes,
		listeners,
		style,
		isDragging,
		priorityConfig
	} = useCard(props)

	return (
		<div
			className={`relative p-6 bg-white dark:bg-neutral-900 rounded-lg shadow list-none ${priorityColors[priority] ?? ''}
			${isDragging ? 'opacity-70' : null} transition-all duration-200 cursor-grab active:cursor-grabbing
			${done && 'opacity-80'}`}
		>
			<li ref={setNodeRef} style={style} {...attributes} {...listeners}>
				<div className='flex flex-col gap-2 dark:text-white wrap-break-word'>
					<div className='flex items-center gap-2'>
						<CardDoneButton
							cardId={id}
							done={done}
							boardId={boardId}
						/>
						<h3 className='text-sm'>{title}</h3>
					</div>
					{description && (
						<span className='text-xs whitespace-pre-wrap wrap-break-word'>
							{description}
						</span>
					)}
				</div>
				<div className='flex flex-col items-end justify-end gap-2 pt-4 pb-2'>
					<div className='flex gap-1'>
						<div className={`${priorityCircle[priority] ?? ''}`} />
						<span className='text-xs'>
							{tPriority(priorityConfig.i18nKey)}
						</span>
					</div>
					<span className='text-xs'>
						{t('expiresAt', {
							date: formatDate(deadline, locale)
						})}
					</span>
				</div>
			</li>
			<div className='flex items-center gap-2'>
				<Modal
					trigger={
						<div className='cursor-pointer w-fit'>
							<SquareArrowOutUpRight size={16} />
						</div>
					}
					contentClassname='sm:max-w-5xl p-0'
				>
					<CardModal {...props} />
				</Modal>
			</div>
			<DeleteCardModal cardId={id} boardId={boardId} />
		</div>
	)
}
