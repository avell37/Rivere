'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { formattedDate } from '@/shared/libs/formattedDate'
import { priorityCircle, priorityColors } from '@/shared/libs/priorityColors'

interface CardProps {
	id: string
	title: string
	description?: string
	priority: string
	deadline: Date
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
		<li
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={`relative p-6 dark:bg-neutral-900 rounded-lg shadow list-none ${priorityColors[priority] ?? ''}
			${isDragging ? 'opacity-70' : null} transition-all duration-200 cursor-grab active:cursor-grabbing`}
		>
			<div className='flex flex-col gap-2 dark:text-white wrap-break-word'>
				<h3 className='text-sm'>{title}</h3>
				<span className='text-xs'>{description}</span>
			</div>
			<div className='flex flex-col items-end justify-end gap-2 pt-4 pb-2'>
				<div className='flex gap-1'>
					<div className={`${priorityCircle[priority] ?? ''}`} />
					<span className='text-xs'>{priority.toLowerCase()}</span>
				</div>
				<span className='text-xs'>{date}</span>
			</div>
		</li>
	)
}
