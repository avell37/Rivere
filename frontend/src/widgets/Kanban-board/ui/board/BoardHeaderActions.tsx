'use client'
import { Link, Users } from 'lucide-react'
import { memo } from 'react'

import {
	BoardHeaderActionsProps,
	BoardMembersList,
	useBoardPermissions
} from '@/entities/Board'
import { BoardFavoriteButton } from '@/entities/Board/ui/BoardFavoriteButton'

import { CreateInviteModal } from '@/features/board-invite'

import { Modal, Popover } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

import { BoardActions } from './BoardActions'

const BoardHeaderActionsComponent = ({ board }: BoardHeaderActionsProps) => {
	const { isOwner } = useBoardPermissions(board.id)

	return (
		<div className='flex items-center gap-2'>
			<BoardFavoriteButton
				boardId={board.id}
				isFavorite={board.isFavorite}
				buttonClassname='p-2 rounded-md hover:bg-white/70 dark:hover:bg-zinc-500 transition'
			/>
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
			<Popover
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
				contentClassname='w-96 max-sm:w-76'
			>
				<div className='flex flex-col gap-4'>
					<BoardMembersList
						members={board.members}
						boardId={board.id}
					/>
				</div>
			</Popover>
			{isOwner && <BoardActions boardId={board.id} />}
		</div>
	)
}

export const BoardHeaderActions = memo(BoardHeaderActionsComponent)
