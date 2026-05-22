'use client'
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { memo, useState } from 'react'

import { useBoardPermissions } from '@/entities/Board'

import { DeleteColumnModal, EditColumnModal } from '@/features/column'

import { IBoardColumnIdentifiers } from '@/shared/types'
import { AppDropdown, DropdownActionItem } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'
import { BoardPermission } from '@/shared/utils'

export const ColumnActionsComponent = ({
	columnId,
	boardId
}: IBoardColumnIdentifiers) => {
	const { can } = useBoardPermissions(boardId)
	const [editOpen, setEditOpen] = useState(false)
	const [deleteOpen, setDeleteOpen] = useState(false)
	const t = useTranslations('column.actions')

	return (
		<>
			<AppDropdown
				trigger={
					<Button
						variant='none'
						size='none'
						className='cursor-pointer'
					>
						<MoreHorizontal />
					</Button>
				}
				contentClassname='mr-3 z-100'
				align='center'
			>
				<DropdownActionItem
					icon={Edit}
					onClick={() => setEditOpen(true)}
				>
					{t('edit')}
				</DropdownActionItem>
				{can(BoardPermission.DELETE_COLUMN) && (
					<DropdownActionItem
						icon={Trash2}
						onClick={() => setDeleteOpen(true)}
					>
						{t('delete')}
					</DropdownActionItem>
				)}
			</AppDropdown>

			<EditColumnModal
				open={editOpen}
				onOpenChange={setEditOpen}
				columnId={columnId}
				boardId={boardId}
			/>

			{can(BoardPermission.DELETE_COLUMN) && (
				<DeleteColumnModal
					open={deleteOpen}
					onOpenChange={setDeleteOpen}
					columnId={columnId}
					boardId={boardId}
				/>
			)}
		</>
	)
}

export const ColumnActions = memo(ColumnActionsComponent)
