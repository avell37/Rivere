'use client'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Modal } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

import { useCreateBoard } from '../model/hooks/useCreateBoard'

import { CreateBoardForm } from './CreateBoardForm'

export const CreateBoardModal = () => {
	const [open, setOpen] = useState(false)
	const { form, onSubmit } = useCreateBoard({
		onSuccess: () => setOpen(false)
	})
	const t = useTranslations('board.create')

	return (
		<Modal
			trigger={
				<Button
					variant='outline'
					size='none'
					className='p-2 cursor-pointer'
				>
					<Plus />
					<span>{t('heading')}</span>
				</Button>
			}
			title={t('title')}
			description={t('description')}
			contentClassname='sm:max-w-lg'
			open={open}
			onOpenChange={setOpen}
		>
			<CreateBoardForm form={form} onSubmit={onSubmit} t={t} />
		</Modal>
	)
}
