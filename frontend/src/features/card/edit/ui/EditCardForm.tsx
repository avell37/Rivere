import { zodResolver } from '@hookform/resolvers/zod'
import { TextAlignJustify } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Form, Separator } from '@/shared/ui/external'

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
}

export const EditCardForm = ({
	id,
	title,
	description,
	priority,
	deadline
}: EditCardProps) => {
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
			<div className='flex flex-col gap-6 w-full'>
				<div className='flex flex-col gap-6'>
					<EditableTitle cardId={id} />
					<Separator />
				</div>
				<div className='flex gap-4'>
					<EditablePriority cardId={id} />
					<EditableDeadline cardId={id} />
				</div>
				<div className='flex flex-col gap-4'>
					<div className='flex items-center gap-2'>
						<TextAlignJustify size='16' />
						<span className='text-xs font-bold'>Описание</span>
					</div>
					<EditableDescription cardId={id} />
				</div>
			</div>
		</Form>
	)
}
