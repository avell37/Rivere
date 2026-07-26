'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import {
	CardDoneButton,
	CardPropsWithBoardId,
	EditCardRequest,
	EditCardSchema
} from '@/entities/Card'

import { Form } from '@/shared/ui/external'

import { EditableAssignee } from './EditableAssignee'
import { EditableDeadline } from './EditableDeadline'
import { EditableDescription } from './EditableDescription'
import { EditablePriority } from './EditablePriority'
import { EditableTags } from './EditableTags'
import { EditableTitle } from './EditableTitle'

export const EditCardForm = ({ card, boardId }: CardPropsWithBoardId) => {
	const t = useTranslations('card.edit')
	const form = useForm<EditCardRequest>({
		resolver: zodResolver(EditCardSchema),
		defaultValues: {
			title: card.title,
			description: card.description,
			priority: card.priority,
			deadline: card.deadline,
			assigneeId: card.assigneeId ?? null
		}
	})

	return (
		<Form {...form}>
			<div className='flex flex-col gap-6 w-full pt-4'>
				<div className='flex items-center gap-2 min-w-0'>
					<CardDoneButton
						cardId={card.id}
						done={card.done}
						boardId={boardId}
						className='mt-1 w-5 h-5'
					/>
					<EditableTitle cardId={card.id} boardId={boardId} />
				</div>
				<div className='flex flex-wrap items-end gap-4'>
					<EditablePriority
						cardId={card.id}
						boardId={boardId}
						t={t}
						className='w-32 border-none bg-transparent'
					/>
					<EditableDeadline cardId={card.id} boardId={boardId} t={t} />
					<EditableAssignee
						cardId={card.id}
						boardId={boardId}
						t={t}
					/>
				</div>
				<EditableTags
					cardId={card.id}
					boardId={boardId}
					tags={card.tags ?? []}
					t={t}
				/>
				<EditableDescription cardId={card.id} boardId={boardId} t={t} />
			</div>
		</Form>
	)
}
