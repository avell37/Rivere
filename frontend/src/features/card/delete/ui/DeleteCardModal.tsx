'use client'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { memo, useState } from 'react'

import { Alert } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

import { useDeleteCard } from '../model/hooks/useDeleteCard'
import { DeleteCardProps } from '../model/types/DeleteCardProps'

const DeleteCardModalComponent = ({ cardId, boardId }: DeleteCardProps) => {
	const [open, setOpen] = useState(false)
	const { onSubmit, isPending } = useDeleteCard({ cardId, boardId, setOpen })
	const t = useTranslations('card.delete')

	return (
		<Alert
			trigger={
				<Button
					className='absolute top-4 right-4 cursor-pointer'
					type='button'
					size='none'
					variant='none'
					onClick={e => e.stopPropagation()}
				>
					<X />
				</Button>
			}
			title={t('deleteTitle')}
			description={t('deleteDescription')}
			actionText={t('deleteActionText')}
			cancelText={t('deleteCancelText')}
			onSubmit={onSubmit}
			isPending={isPending}
			open={open}
			onOpenChange={setOpen}
		/>
	)
}

export const DeleteCardModal = memo(DeleteCardModalComponent)
