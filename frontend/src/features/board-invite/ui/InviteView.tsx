'use client'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { PUBLIC_URL } from '@/shared/libs/constants/url.config'
import { Button } from '@/shared/ui/external'

import { useInvite } from '../model/hooks/useInvite'

export const InviteView = () => {
	const router = useRouter()
	const { token } = useParams<{ token: string }>()
	const { acceptInviteToBoard, acceptPending } = useInvite()

	const handleAccept = async () => {
		await acceptInviteToBoard(token)
		router.push(PUBLIC_URL.boards())
		toast.success('Приглашение в доску принято')
	}

	return (
		<div className='h-screen flex items-center justify-center'>
			<div className='bg-zinc-800 p-6 rounded-md'>
				<h1 className='text-xl mb-4'>Вас приглашают в доску</h1>

				<Button onClick={handleAccept} disabled={acceptPending}>
					Принять
				</Button>
			</div>
		</div>
	)
}
