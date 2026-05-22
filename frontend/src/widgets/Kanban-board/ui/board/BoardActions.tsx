'use client'
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { useBoardPermissions } from '@/entities/Board'

import { DeleteBoardModal, EditBoardModal } from '@/features/board'

import { AppDropdown, DropdownActionItem } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'
import { BoardPermission } from '@/shared/utils'

export const BoardActions = ({ boardId }: { boardId: string }) => {
	const { can } = useBoardPermissions(boardId)
	const [editOpen, setEditOpen] = useState(false)
	const [deleteOpen, setDeleteOpen] = useState(false)
	const t = useTranslations('board.actions')

	return (
		<>
			<AppDropdown
				trigger={
					<Button
						variant='none'
						size='none'
						className='p-2 rounded-md hover:bg-white/70 dark:hover:bg-zinc-500 transition'
					>
						<MoreHorizontal />
					</Button>
				}
				contentClassname='mr-3 z-100'
			>
				{can(BoardPermission.MANAGE_BOARD) && (
					<DropdownActionItem
						icon={Edit}
						onClick={() => setEditOpen(true)}
					>
						{t('edit')}
					</DropdownActionItem>
				)}
				{can(BoardPermission.DELETE_BOARD) && (
					<DropdownActionItem
						icon={Trash2}
						onClick={() => setDeleteOpen(true)}
					>
						{t('delete')}
					</DropdownActionItem>
				)}
			</AppDropdown>

			{can(BoardPermission.MANAGE_BOARD) && (
				<EditBoardModal
					open={editOpen}
					onOpenChange={setEditOpen}
					boardId={boardId}
				/>
			)}

			{can(BoardPermission.DELETE_BOARD) && (
				<DeleteBoardModal
					open={deleteOpen}
					onOpenChange={setDeleteOpen}
					boardId={boardId}
				/>
			)}
		</>
	)
}
