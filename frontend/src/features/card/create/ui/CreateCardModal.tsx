'use client'
import { Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { memo, useState } from 'react'

import { IBoardColumnIdentifiers } from '@/shared/types/IBoardColumnIdentifiers'
import { Modal } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

import { useCreateCard } from '../model/hooks/useCreateCard'

import { CreateCardForm } from './CreateCardForm'

export const CreateCardModal = memo(
	({ columnId, boardId }: IBoardColumnIdentifiers) => {
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
					<Button
						variant='none'
						size='none'
						className='p-2 mt-2 border cursor-pointer bg-black hover:bg-background'
					>
						<Plus />
						{t('heading')}
					</Button>
				}
				title={t('createTitle')}
				contentClassname='w-full max-w-md'
				open={open}
				onOpenChange={setOpen}
			>
				<CreateCardForm form={form} onSubmit={onSubmit} t={t} />
			</Modal>
		)
	}
)
