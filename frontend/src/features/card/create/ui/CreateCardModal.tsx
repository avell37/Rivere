'use client'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { IBoardColumnIdentifiers } from '@/shared/types/IBoardColumnIdentifiers'
import { Modal } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

import { useCreateCard } from '../model/hooks/useCreateCard'

import { CreateCardForm } from './CreateCardForm'

export const CreateCardModal = ({
	columnId,
	boardId
}: IBoardColumnIdentifiers) => {
	const [open, setOpen] = useState(false)
	const { form, onSubmit } = useCreateCard({
		columnId,
		boardId,
		onSuccess: () => setOpen(false)
	})
	const t = useTranslations('card.create')

	return (
		<Modal
			trigger={
				<Button variant='none' size='none' className='cursor-pointer'>
					<Plus />
				</Button>
			}
			title={t('createTitle')}
			contentClassname='sm:max-w-md'
			open={open}
			onOpenChange={setOpen}
		>
			<CreateCardForm form={form} onSubmit={onSubmit} t={t} />
		</Modal>
	)
}
