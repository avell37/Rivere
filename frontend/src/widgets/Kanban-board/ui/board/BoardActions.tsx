'use client'
import { Edit, Archive, MoreHorizontal } from 'lucide-react'
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
	const [archiveOpen, setArchiveOpen] = useState(false)
	const t = useTranslations('board.actions')

	return (
		<>
			<AppDropdown
				trigger={
					<Button
						variant='none'
						size='none'
						className='p-2 rounded-md hover:bg-accent/80 dark:hover:bg-zinc-500 transition'
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
						icon={Archive}
						onClick={() => setArchiveOpen(true)}
					>
						{t('archive')}
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
					open={archiveOpen}
					onOpenChange={setArchiveOpen}
					boardId={boardId}
				/>
			)}
		</>
	)
}
