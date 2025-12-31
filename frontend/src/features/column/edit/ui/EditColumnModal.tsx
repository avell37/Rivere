'use client'
import { Edit } from 'lucide-react'

import { Modal } from '@/shared/ui/custom/Modal/Modal'
import { Button } from '@/shared/ui/external'

import { useEditColumn } from '../model/hooks/useEditColumn'

import { EditColumnForm } from './EditColumnForm'

export const EditColumnModal = ({ columnId }: { columnId: string }) => {
	const { form, onSubmit } = useEditColumn(columnId)

	return (
		<Modal
			trigger={
				<Button size='none' variant='none' className='cursor-pointer'>
					<Edit />
				</Button>
			}
			title='Изменить название'
			description='Введите название для вашей колонки'
			contentClassname='sm:max-w-md'
		>
			<EditColumnForm form={form} onSubmit={onSubmit} />
		</Modal>
	)
}
