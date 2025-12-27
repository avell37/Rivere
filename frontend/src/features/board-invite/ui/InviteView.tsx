'use client'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { PUBLIC_URL } from '@/shared/libs/constants/url.config'
import { customAvatar } from '@/shared/libs/customAvatar'
import { formattedDate } from '@/shared/libs/formattedDate'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button
} from '@/shared/ui/external'

import { useInvite } from '../model/hooks/useInvite'

export const InviteView = () => {
	const router = useRouter()
	const { token } = useParams<{ token: string }>()
	const { data, acceptInviteToBoard, acceptPending } = useInvite(token)
	console.log(data)
	const handleAccept = async () => {
		await acceptInviteToBoard(token)
		router.push(PUBLIC_URL.boards())
		toast.success('Приглашение в доску принято')
	}

	if (!data) return <div>Loading...</div>

	return (
		<div className='h-screen flex items-center justify-center'>
			<div className='relative flex flex-col gap-4 bg-zinc-800 p-6 rounded-md max-w-lg w-full'>
				<div className='flex flex-col gap-1'>
					<div className='flex items-center gap-2'>
						<Avatar className='w-8 h-8 rounded-full bg-red-500'>
							<AvatarImage src={data?.invitedBy?.avatar} />
							<AvatarFallback>
								{customAvatar(data?.invitedBy?.nickname)}
							</AvatarFallback>
						</Avatar>
						<span className='wrap-break-word'>
							{data?.invitedBy?.nickname}
						</span>
					</div>
					<h1 className='wrap-break-word'>приглашает вас в доску:</h1>
				</div>
				<div className='flex flex-col'>
					<span className='font-bold'>{data?.board?.title}</span>
					<span>Участники: {data?.board?.membersCount}</span>
				</div>
				<span className='absolute top-4 right-2 text-xs text-gray-400'>
					действительно до: {formattedDate(data.expiresAt)}
				</span>
				<div className='flex justify-between gap-2'>
					<Button
						onClick={handleAccept}
						disabled={acceptPending}
						className='flex-1'
					>
						Принять
					</Button>
					<Button className='flex-1 bg-red-400/70'>Отклонить</Button>
				</div>
			</div>
		</div>
	)
}
