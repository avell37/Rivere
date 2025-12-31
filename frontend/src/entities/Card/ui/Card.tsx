'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { SquareArrowOutUpRight } from 'lucide-react'

import { DeleteCardModal } from '@/features/card/delete/ui/DeleteCardModal'
import { EditCardForm } from '@/features/card/edit/ui/EditCardForm'
import { Chat } from '@/features/chat/ui/Chat'

import { formattedDate } from '@/shared/libs/formattedDate'
import { priorityCircle, priorityColors } from '@/shared/libs/priorityColors'
import { Modal } from '@/shared/ui/custom'

import { Priority } from '../model/types/CardPriority'

interface CardProps {
	id: string
	title: string
	description?: string
	priority: Priority
	deadline: string
	columnId: string
}

export const Card = ({
	id,
	title,
	description,
	priority,
	deadline,
	columnId
}: CardProps) => {
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
				columnId
			}
		}
	})
	const date = formattedDate(deadline)

	const style = {
		transform: CSS.Transform.toString(transform),
		transition
	}
	return (
		<div
			className={`relative p-6 dark:bg-neutral-900 rounded-lg shadow list-none ${priorityColors[priority] ?? ''}
			${isDragging ? 'opacity-70' : null} transition-all duration-200 cursor-grab active:cursor-grabbing`}
		>
			<li ref={setNodeRef} style={style} {...attributes} {...listeners}>
				<div className='flex flex-col gap-2 dark:text-white wrap-break-word'>
					<h3 className='text-sm'>{title}</h3>
					<span className='text-xs'>{description}</span>
				</div>
				<div className='flex flex-col items-end justify-end gap-2 pt-4 pb-2'>
					<div className='flex gap-1'>
						<div className={`${priorityCircle[priority] ?? ''}`} />
						<span className='text-xs'>
							{priority.toLowerCase()}
						</span>
					</div>
					<span className='text-xs'>{date}</span>
				</div>
			</li>
			<Modal
				trigger={
					<div className='cursor-pointer'>
						<SquareArrowOutUpRight size={16} />
					</div>
				}
				contentClassname='sm:max-w-5xl'
				children={
					<div className='flex justify-between'>
						<EditCardForm
							id={id}
							title={title}
							description={description}
							priority={priority}
							deadline={deadline}
						/>
						<Chat cardId={id} />
					</div>
				}
			/>
			<DeleteCardModal cardId={id} />
		</div>
	)
}
