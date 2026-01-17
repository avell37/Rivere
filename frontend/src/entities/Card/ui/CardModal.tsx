import { EditCardForm } from '@/features/card'
import { Chat } from '@/features/chat'

import { Separator } from '@/shared/ui/external'

import { CardModalProps } from '../model/types/CardProps'

export const CardModal = (props: CardModalProps) => {
	return (
		<div className='relative flex flex-col pt-2'>
			<div className='pt-5'>
				<Separator />
			</div>
			<div className='flex justify-between pl-6'>
				<EditCardForm {...props} />
				<Chat cardId={props.id} />
			</div>
		</div>
	)
}
