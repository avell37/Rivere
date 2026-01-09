import { zodResolver } from '@hookform/resolvers/zod'
import { Check, TextAlignJustify } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

import { CardDoneButton } from '@/entities/Card/ui/CardDoneButton'

import { Button, Form } from '@/shared/ui/external'

import {
	EditCardRequest,
	EditCardSchema
} from '../model/validation/edit-card.z.validation'

import { EditableDeadline } from './EditableDeadline'
import { EditableDescription } from './EditableDescription'
import { EditablePriority } from './EditablePriority'
import { EditableTitle } from './EditableTitle'

interface EditCardProps {
	id: string
	title: string
	description?: string
	priority: EditCardRequest['priority']
	deadline: string
	done: boolean
	boardId: string
}

export const EditCardForm = ({
	id,
	title,
	description,
	priority,
	deadline,
	done,
	boardId
}: EditCardProps) => {
	const t = useTranslations('card.edit')
	const form = useForm<EditCardRequest>({
		resolver: zodResolver(EditCardSchema),
		defaultValues: {
			title,
			description,
			priority,
			deadline
		}
	})

	return (
		<Form {...form}>
			<div className='flex flex-col gap-6 w-full pt-4'>
				<div className='flex items-center gap-2'>
					<CardDoneButton cardId={id} done={done} boardId={boardId} />
					<EditableTitle cardId={id} />
				</div>
				<div className='flex gap-4'>
					<EditablePriority cardId={id} t={t} />
					<EditableDeadline cardId={id} t={t} />
				</div>
				<div className='flex flex-col gap-4'>
					<div className='flex items-center gap-2'>
						<TextAlignJustify size='16' />
						<span className='text-xs font-bold'>
							{t('description')}
						</span>
					</div>
					<EditableDescription cardId={id} t={t} />
				</div>
			</div>
		</Form>
	)
}
