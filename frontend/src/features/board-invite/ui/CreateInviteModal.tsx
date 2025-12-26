import { Copy } from 'lucide-react'
import { toast } from 'sonner'

import { Button, Input } from '@/shared/ui/external'

import { useInvite } from '../model/hooks/useInvite'

export const CreateInviteModal = ({ boardId }: { boardId: string }) => {
	const { createInviteData, createInviteToBoard, createPending } = useInvite()

	const handleCreate = async () => {
		await createInviteToBoard(boardId)
	}

	const handleCopy = () => {
		navigator.clipboard.writeText(createInviteData.link)
		toast.success('Ссылка скопирована')
	}

	return (
		<div className='flex flex-col'>
			<h2 className='text-lg mb-3'>Приглашение в доску</h2>

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
					Создать ссылку
				</Button>
			)}
		</div>
	)
}
