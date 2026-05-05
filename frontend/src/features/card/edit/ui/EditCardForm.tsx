'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextAlignJustify } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import {
	CardDoneButton,
	CardPropsWithBoardId,
	EditCardRequest,
	EditCardSchema
} from '@/entities/Card'

import { Form } from '@/shared/ui/external'

import { EditableDeadline } from './EditableDeadline'
import { EditableDescription } from './EditableDescription'
import { EditablePriority } from './EditablePriority'
import { EditableTitle } from './EditableTitle'

export const EditCardForm = ({ card, boardId }: CardPropsWithBoardId) => {
	const t = useTranslations('card.edit')
	const form = useForm<EditCardRequest>({
		resolver: zodResolver(EditCardSchema),
		defaultValues: {
			title: card.title,
			description: card.description,
			priority: card.priority,
			deadline: card.deadline
		}
	})

	return (
		<Form {...form}>
			<div className='flex flex-col gap-6 w-full pt-4'>
				<div className='flex items-center gap-2'>
					<CardDoneButton
						cardId={card.id}
						done={card.done}
						boardId={boardId}
						className='mt-2 w-5 h-5'
					/>
					<EditableTitle cardId={card.id} />
				</div>
				<div className='flex items-end gap-4 max-[470px]:flex-col max-sm:items-start'>
					<EditablePriority cardId={card.id} t={t} />
					<EditableDeadline cardId={card.id} t={t} />
				</div>
				<div className='flex flex-col gap-4 mb-8'>
					<div className='flex items-center gap-2'>
						<TextAlignJustify size='16' />
						<span className='text-xs font-bold'>
							{t('description')}
						</span>
					</div>
					<EditableDescription cardId={card.id} t={t} />
				</div>
			</div>
		</Form>
	)
}
