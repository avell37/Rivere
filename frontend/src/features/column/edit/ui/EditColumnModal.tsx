'use client'
import { Edit } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Modal } from '@/shared/ui/custom/Modal/Modal'
import { Button } from '@/shared/ui/external'

import { useEditColumn } from '../model/hooks/useEditColumn'

import { EditColumnForm } from './EditColumnForm'

export const EditColumnModal = ({ columnId }: { columnId: string }) => {
	const { form, onSubmit } = useEditColumn(columnId)
	const t = useTranslations('column.edit')

	return (
		<Modal
			trigger={
				<Button size='none' variant='none' className='cursor-pointer'>
					<Edit />
				</Button>
			}
			title={t('editTitle')}
			description={t('editDescription')}
			contentClassname='sm:max-w-md'
		>
			<EditColumnForm form={form} onSubmit={onSubmit} t={t} />
		</Modal>
	)
}
