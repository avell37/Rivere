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
		navigator.clipboard.writeText(createInviteData.link)
		toast.success(t('copyLink'))
	}

	return (
		<div className='flex flex-col'>
			<h2 className='text-lg mb-3'>{t('heading')}</h2>

			{createInviteData ? (
				<div className='flex gap-2'>
					<Input
						className='flex-1'
						readOnly
						value={createInviteData.link}
					/>
					<Button onClick={handleCopy}>
						<Copy />
					</Button>
				</div>
			) : (
				<Button onClick={handleCreate} disabled={createPending}>
					{t('createLink')}
				</Button>
			)}
		</div>
	)
}
