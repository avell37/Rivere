'use client'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Modal } from '@/shared/ui/custom/Modal/Modal'

import { useCreateColumn } from '../model/hooks/useCreateColumn'

import { CreateColumnForm } from './CreateColumnForm'

export const CreateColumnModal = ({ boardId }: { boardId: string }) => {
	const { form, onSubmit } = useCreateColumn(boardId)
	const t = useTranslations('column.create')

	return (
		<Modal
			trigger={
				<div className='flex flex-col relative rounded-t-md overflow-hidden cursor-pointer transition-all group w-74'>
					<div className='flex justify-center items-center gap-2 rounded-md p-4.5 dark:bg-neutral-900'>
						<Plus />
						<h3 className='font-semibold text-base text-white'>
							{t('heading')}
						</h3>
					</div>
				</div>
			}
			title={t('createTitle')}
			description={t('createDescription')}
			contentClassname='sm:max-w-md'
		>
			<CreateColumnForm form={form} onSubmit={onSubmit} t={t} />
		</Modal>
	)
}
