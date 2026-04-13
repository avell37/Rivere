import { memo } from 'react'

import { ICard } from '@/entities/Card'

import { EditCardForm } from '@/features/card'
import { Chat } from '@/features/chat'

import { Separator } from '@/shared/ui/external'

interface props {
	card?: ICard
	boardId: string
}

export const CardModal = memo(({ card, boardId }: props) => {
	if (!card) return

	return (
		<div className='relative flex flex-col pt-2'>
			<div className='pt-5'>
				<Separator />
			</div>
			<div className='flex justify-between gap-6 pl-6 max-lg:flex-col max-lg:pl-0'>
				<EditCardForm card={card} boardId={boardId} />
				<Chat cardId={card.id} />
			</div>
		</div>
	)
})
