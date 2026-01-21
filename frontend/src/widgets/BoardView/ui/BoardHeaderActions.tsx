import { Link, Users } from 'lucide-react'

import { BoardMembersList } from '@/entities/Board'

import { CreateInviteModal } from '@/features/board-invite'

import { Modal } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

import { BoardHeaderActionsProps } from '../model/types/BoardProps'

import { BoardActions } from './BoardActions'

export const BoardHeaderActions = ({ board }: BoardHeaderActionsProps) => {
	return (
		<div className='flex items-center gap-2'>
			<Modal
				trigger={
					<Button
						type='button'
						variant='none'
						size='none'
						className='p-2 rounded-md hover:bg-white/70 dark:hover:bg-zinc-500 transition'
					>
						<Link size={18} />
					</Button>
				}
				contentClassname='max-w-md'
			>
				<CreateInviteModal boardId={board.id} />
			</Modal>
			<Modal
				trigger={
					<Button
						type='button'
						variant='none'
						size='none'
						className='p-2 rounded-md hover:bg-white/70 dark:hover:bg-zinc-500 transition'
					>
						<Users size={18} />
					</Button>
				}
				contentClassname='max-w-lg'
			>
				<div className='flex flex-col gap-4'>
					<BoardMembersList
						members={board.members}
						boardId={board.id}
					/>
				</div>
			</Modal>
			<BoardActions boardId={board.id} />
		</div>
	)
}
