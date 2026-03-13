'use client'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { memo } from 'react'

import { Alert } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

import { useDeleteCard } from '../model/hooks/useDeleteCard'
import { DeleteCardProps } from '../model/types/DeleteCardProps'

export const DeleteCardModal = memo(({ cardId, boardId }: DeleteCardProps) => {
	const { onSubmit } = useDeleteCard({ cardId, boardId })
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
		/>
	)
})
