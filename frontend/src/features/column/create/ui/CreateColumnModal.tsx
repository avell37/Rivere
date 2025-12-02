'use client'
import { Plus } from 'lucide-react'

import { Modal } from '@/shared/ui/custom/Modal/Modal'

import { useCreateColumn } from '../model/hooks/useCreateColumn'

import { CreateColumnForm } from './CreateColumnForm'

export const CreateColumnModal = ({ boardId }: { boardId: string }) => {
	const { form, onSubmit } = useCreateColumn(boardId)

	return (
		<Modal
			trigger={
				<div className='flex flex-col relative rounded-t-md overflow-hidden cursor-pointer transition-all group max-w-[200px] w-full'>
					<div className='flex justify-center items-center gap-2 rounded-md p-4.5 dark:bg-neutral-900'>
						<Plus />
						<h3 className='font-semibold text-base text-white'>
							Создать
						</h3>
					</div>
				</div>
			}
			title='Добавить колонку'
			description='Введите названия для вашей новой колонки'
		>
			<CreateColumnForm form={form} onSubmit={onSubmit} />
		</Modal>
	)
}
