'use client'
import { Copy } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { Button, Input } from '@/shared/ui/external'

import { useInvite } from '../model/hooks/useInvite'

export const CreateInviteModal = ({ boardId }: { boardId: string }) => {
	const { createInviteData, createInviteToBoard, createPending } = useInvite()
	const t = useTranslations('invite')
	const handleCreate = async () => {
		await createInviteToBoard(boardId)
	}

	const handleCopy = () => {
		if (createInviteData) {
			navigator.clipboard.writeText(createInviteData.link)
			toast.success(t('copyLink'))
		}
	}

	const isCreateDisabled = createPending || !!createInviteData?.link

	return (
		<div className='flex flex-col gap-4'>
			<h2 className='text-lg font-semibold'>{t('heading')}</h2>

			<div className='flex gap-2'>
				<Input
					className='flex-1'
					readOnly
					value={createInviteData?.link ?? ''}
				/>
				<Button
					variant='outline'
					disabled={!createInviteData}
					onClick={handleCopy}
				>
					<Copy />
				</Button>
			</div>
			<Button onClick={handleCreate} disabled={isCreateDisabled}>
				{t('createLink')}
			</Button>
		</div>
	)
}
