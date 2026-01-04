'use client'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Modal } from '@/shared/ui/custom/Modal/Modal'

import { useCreateCard } from '../model/hooks/useCreateCard'

import { CreateCardForm } from './CreateCardForm'

export const CreateCardModal = ({ columnId }: { columnId: string }) => {
	const { form, onSubmit } = useCreateCard(columnId)
	const t = useTranslations('card.create')

	return (
		<Modal
			trigger={
				<div className='flex flex-col relative rounded-t-md overflow-hidden cursor-pointer transition-all group w-76'>
					<div className='flex justify-center items-center gap-2 rounded-md p-4.5 dark:bg-neutral-900'>
						<Plus />
						<h3 className='font-semibold text-base text-white'>
							{t('heading')}
						</h3>
					</div>
				</div>
			}
			title={t('createTitle')}
			contentClassname='sm:max-w-md'
		>
			<CreateCardForm form={form} onSubmit={onSubmit} t={t} />
		</Modal>
	)
}
