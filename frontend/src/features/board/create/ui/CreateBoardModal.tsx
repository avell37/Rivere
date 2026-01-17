'use client'
import { useTranslations } from 'next-intl'

import { Modal } from '@/shared/ui/custom'

import { useCreateBoard } from '../model/hooks/useCreateBoard'

import { CreateBoardForm } from './CreateBoardForm'

export const CreateBoardModal = () => {
	const { form, onSubmit } = useCreateBoard()
	const t = useTranslations('board.create')

	return (
		<Modal
			trigger={
				<div>
					<div className='flex flex-col relative rounded-t-md overflow-hidden cursor-pointer transition-all group min-w-[200px] w-full h-30'>
						<div className='flex justify-center items-center rounded-md h-30 bg-zinc-800/30 dark:bg-zinc-800/80'>
							<h3 className='font-semibold text-base text-white'>
								{t('heading')}
							</h3>
						</div>
						<div className='absolute inset-0 group-hover:bg-black/35 transition-colors' />
					</div>
				</div>
			}
			title={t('title')}
			description={t('description')}
			contentClassname='sm:max-w-lg'
		>
			<CreateBoardForm form={form} onSubmit={onSubmit} t={t} />
		</Modal>
	)
}
