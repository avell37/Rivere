import { Users } from 'lucide-react'

import { EditCardForm } from '@/features/card/edit/ui/EditCardForm'
import { Chat } from '@/features/chat/ui/Chat'

import { Separator } from '@/shared/ui/external'

import { Priority } from '../model/types/CardPriority'

interface CardModalProps {
	id: string
	title: string
	description?: string
	priority: Priority
	deadline: string
	done: boolean
	boardId: string
}

export const CardModal = ({
	id,
	title,
	description,
	priority,
	deadline,
	done,
	boardId
}: CardModalProps) => {
	return (
		<div className='relative flex flex-col pt-2'>
			<div className='pt-5'>
				<Separator />
			</div>
			<div className='flex justify-between pl-6'>
				<EditCardForm
					id={id}
					title={title}
					description={description}
					priority={priority}
					deadline={deadline}
					done={done}
					boardId={boardId}
				/>
				<Chat cardId={id} />
			</div>
		</div>
	)
}
