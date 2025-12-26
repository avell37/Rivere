import { Link, Settings, Users } from 'lucide-react'

import { IBoard } from '@/entities/Board/model/types/IBoard'

import { CreateInviteModal } from '@/features/board-invite/ui/CreateInviteModal'

import { customAvatar } from '@/shared/libs/customAvatar'
import { formattedDate } from '@/shared/libs/formattedDate'
import { Modal } from '@/shared/ui/custom'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button
} from '@/shared/ui/external'

interface BoardHeaderActionsProps {
	board: IBoard
}

export const BoardHeaderActions = ({ board }: BoardHeaderActionsProps) => {
	return (
		<div className='flex items-center gap-2 '>
			<Modal
				trigger={
					<Button
						type='button'
						variant='none'
						size='none'
						className='p-2 rounded-md hover:bg-zinc-700 transition'
					>
						<Link size={18} />
					</Button>
				}
				contentClassname='max-w-md'
				children={<CreateInviteModal boardId={board.id} />}
			/>
			<Modal
				trigger={
					<Button
						type='button'
						variant='none'
						size='none'
						className='p-2 rounded-md hover:bg-zinc-700 transition'
					>
						<Users size={18} />
					</Button>
				}
				contentClassname='max-w-lg'
				children={
					<div className='flex flex-col gap-4'>
						{board.members.map(member => (
							<div className='flex gap-4'>
								<Avatar className='rounded-full'>
									<AvatarImage src={member.user.avatar} />
									<AvatarFallback>
										{customAvatar(
											member.user.displayUsername
										)}
									</AvatarFallback>
								</Avatar>
								<div>
									<div>{member.user.displayUsername}</div>
									<div>
										Присоединился:{' '}
										{formattedDate(member.createdAt)}
									</div>
								</div>
							</div>
						))}
					</div>
				}
			/>
			<Button
				type='button'
				variant='none'
				size='none'
				className='p-2 rounded-md hover:bg-zinc-700 transition'
			>
				<Settings size={18} />
			</Button>
		</div>
	)
}
