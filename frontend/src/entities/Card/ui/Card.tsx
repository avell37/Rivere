'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SquareArrowOutUpRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { DeleteCardModal } from '@/features/card/delete/ui/DeleteCardModal'

import { formatDate } from '@/shared/libs/formattedDate'
import { priorityCircle, priorityColors } from '@/shared/libs/priorityColors'
import { priorityOptions } from '@/shared/libs/priorityConfig'
import { Modal } from '@/shared/ui/custom'

import { Priority } from '../model/types/CardPriority'

import { CardDoneButton } from './CardDoneButton'
import { CardModal } from './CardModal'

interface CardProps {
	id: string
	title: string
	description?: string
	priority: Priority
	deadline: string
	done: boolean
	columnId: string
	boardId: string
}

export const Card = ({
	id,
	title,
	description,
	priority,
	deadline,
	done,
	columnId,
	boardId
}: CardProps) => {
	const tPriority = useTranslations('priority')
	const locale = useLocale()
	const priorityConfig = priorityOptions[priority]
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({
		id,
		data: {
			type: 'card',
			card: {
				id,
				title,
				description,
				priority,
				deadline,
				done,
				columnId
			}
		}
	})
	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}

	return (
		<div
			className={`relative p-6 dark:bg-neutral-900 rounded-lg shadow list-none ${priorityColors[priority] ?? ''}
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
						<span className='text-xs'>{description}</span>
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
						до: {formatDate(deadline, locale)}
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
					children={
						<CardModal
							id={id}
							title={title}
							description={description}
							priority={priority}
							deadline={deadline}
							done={done}
							boardId={boardId}
						/>
					}
				/>
			</div>
			<DeleteCardModal cardId={id} />
		</div>
	)
}
