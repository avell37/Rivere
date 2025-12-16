import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Form, Separator } from '@/shared/ui/external'

import { EditCardSchema } from '../model/validation/edit-card.z.validation'

import { EditableDescription } from './EditableDescription'
import { EditablePriority } from './EditablePriority'
import { EditableTitle } from './EditableTitle'

interface EditCardProps {
	id: string
	title: string
	description?: string
	priority: string
	deadline: Date
}

export const EditCardForm = ({
	id,
	title,
	description,
	priority,
	deadline
}: EditCardProps) => {
	const form = useForm({
		resolver: zodResolver(EditCardSchema),
		defaultValues: {
			title,
			description
		}
	})

	return (
		<Form {...form}>
			<div className='flex flex-col gap-4 w-full'>
				<div className='flex flex-col gap-6'>
					<EditableTitle cardId={id} />
					<Separator />
					<EditableDescription cardId={id} />
				</div>
				<div>{/* <EditablePriority cardId={id} /> */}</div>
			</div>
		</Form>
	)
}
