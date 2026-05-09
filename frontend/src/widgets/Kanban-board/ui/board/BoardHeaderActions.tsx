'use client'
import { Link, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { memo } from 'react'

import {
	BoardFavoriteButton,
	BoardHeaderActionsProps,
	BoardMembersList,
	useBoardPermissions
} from '@/entities/Board'

import { CreateInviteModal } from '@/features/board-invite'

import { Modal, Popover } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

import { BoardActions } from './BoardActions'

const BoardHeaderActionsComponent = ({ board }: BoardHeaderActionsProps) => {
	const t = useTranslations()
	const { isOwner } = useBoardPermissions(board.id)

	return (
		<div className='flex items-center gap-2'>
			<BoardFavoriteButton
				boardId={board.id}
				isFavorite={board.isFavorite}
				isBoardPage={true}
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
				title={t('invite.heading')}
				description={t('invite.description')}
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
