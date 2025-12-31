import { X } from 'lucide-react'

import { Alert } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

import { useDeleteColumn } from '../model/hooks/useDeleteColumn'

export const DeleteColumnModal = ({ columnId }: { columnId: string }) => {
	const { onSubmit } = useDeleteColumn(columnId)

	return (
		<Alert
			trigger={
				<Button
					type='button'
					size='none'
					variant='none'
					className='cursor-pointer'
				>
					<X />
				</Button>
			}
			title='Удалить колонку?'
			description='Это действие нельзя отменить, ваша колонка будет стерта навсегда.'
			actionText='Удалить'
			cancelText='Отменить'
			onSubmit={onSubmit}
		/>
	)
}
