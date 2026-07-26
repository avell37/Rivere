'use client'
import { Link, Settings } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { memo, Suspense } from 'react'

import {
	BoardFavoriteButton,
	IBoard,
	useBoardPermissions
} from '@/entities/Board'

import { CreateInviteModal } from '@/features/board-invite'
import { BoardFiltersDropdown } from '@/features/filters/board-filters'

import { Modal } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'
import { BoardPermission } from '@/shared/utils'

import { BoardArchivePopover } from '../archive/BoardArchivePopover'

import { BoardActions } from './BoardActions'
import { BoardCardSearch } from './BoardCardSearch'
import { BoardSettings } from './BoardSettings'

const BoardHeaderActionsComponent = ({ board }: { board: IBoard }) => {
	const t = useTranslations()
	const { can } = useBoardPermissions(board.id)

	return (
		<div className='flex items-center gap-2'>
			<Suspense fallback={null}>
				<BoardCardSearch />
			</Suspense>
			<BoardFavoriteButton
				boardId={board.id}
				isFavorite={board.isFavorite}
				isBoardPage={true}
				buttonClassname='p-2 rounded-md hover:bg-accent/80 dark:hover:bg-zinc-500 transition'
			/>
			<Modal
				trigger={
					<Button
						type='button'
						variant='none'
						size='none'
						className='p-2 rounded-md hover:bg-accent/80 dark:hover:bg-zinc-500 transition'
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
			<BoardFiltersDropdown boardId={board.id} />
			<BoardArchivePopover boardId={board.id} />
			<Modal
				trigger={
					<Button
						type='button'
						variant='none'
						size='none'
						className='p-2 rounded-md hover:bg-accent/80 dark:hover:bg-zinc-500 transition'
					>
						<Settings size={18} />
					</Button>
				}
				contentClassname='max-w-6xl'
				title={t('board.settings.heading')}
			>
				<BoardSettings board={board} />
			</Modal>
			{(can(BoardPermission.MANAGE_BOARD) ||
				can(BoardPermission.DELETE_BOARD)) && (
				<BoardActions boardId={board.id} />
			)}
		</div>
	)
}

export const BoardHeaderActions = memo(BoardHeaderActionsComponent)
