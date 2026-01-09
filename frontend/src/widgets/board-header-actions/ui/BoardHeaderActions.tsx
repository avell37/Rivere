import { Link, Settings, Users } from 'lucide-react'

import { IBoard } from '@/entities/Board/model/types/IBoard'
import { BoardMembersList } from '@/entities/Board/ui/BoardMembersList'

import { CreateInviteModal } from '@/features/board-invite/ui/CreateInviteModal'

import { Modal } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

interface BoardHeaderActionsProps {
	board: IBoard
}

export const BoardHeaderActions = ({ board }: BoardHeaderActionsProps) => {
	return (
		<div className='flex items-center gap-2'>
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
						<BoardMembersList members={board.members} />
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
