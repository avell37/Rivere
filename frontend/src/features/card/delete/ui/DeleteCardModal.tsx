import { X } from 'lucide-react'

import { Alert } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

import { useDeleteCard } from '../model/hooks/useDeleteCard'

export const DeleteCardModal = ({ cardId }: { cardId: string }) => {
	const { onSubmit } = useDeleteCard(cardId)

	return (
		<Alert
			trigger={
				<Button
					className='absolute top-4 right-4 cursor-pointer'
					type='button'
					size='none'
					variant='none'
				>
					<X />
				</Button>
			}
			title='Удалить карточку?'
			description='Это действие нельзя отменить, ваша карточка будет стерта навсегда.'
			actionText='Удалить'
			cancelText='Отменить'
			onSubmit={onSubmit}
		/>
	)
}
