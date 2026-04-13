'use client'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { memo, useState } from 'react'

import { Modal } from '@/shared/ui/custom'

import { useCreateColumn } from '../model/hooks/useCreateColumn'

import { CreateColumnForm } from './CreateColumnForm'

export const CreateColumnModal = memo(({ boardId }: { boardId: string }) => {
	const [open, setOpen] = useState(false)
	const { form, onSubmit } = useCreateColumn({
		boardId,
		onSuccess: () => setOpen(false)
	})
	const t = useTranslations('column.create')

	return (
		<Modal
			trigger={
				<div className='flex flex-col relative rounded-t-md cursor-pointer transition-all group w-74'>
					<div className='flex justify-center items-center gap-2 rounded-md p-4.5 bg-background dark:bg-neutral-900'>
						<Plus />
						<h3 className='font-semibold text-base dark:text-white'>
							{t('heading')}
						</h3>
					</div>
				</div>
			}
			title={t('createTitle')}
			description={t('createDescription')}
			contentClassname='sm:max-w-md'
			open={open}
			onOpenChange={setOpen}
		>
			<CreateColumnForm form={form} onSubmit={onSubmit} t={t} />
		</Modal>
	)
})
