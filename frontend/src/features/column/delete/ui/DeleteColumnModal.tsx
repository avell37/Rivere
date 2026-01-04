import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Alert } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

import { useDeleteColumn } from '../model/hooks/useDeleteColumn'

export const DeleteColumnModal = ({ columnId }: { columnId: string }) => {
	const { onSubmit } = useDeleteColumn(columnId)
	const t = useTranslations('column.delete')

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
			title={t('deleteTitle')}
			description={t('deleteDescription')}
			actionText={t('deleteActionText')}
			cancelText={t('deleteCancelText')}
			onSubmit={onSubmit}
		/>
	)
}
