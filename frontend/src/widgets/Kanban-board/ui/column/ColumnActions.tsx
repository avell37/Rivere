'use client'
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { memo, useState } from 'react'

import { DeleteColumnModal, EditColumnModal } from '@/features/column'

import { IBoardColumnIdentifiers } from '@/shared/types/IBoardColumnIdentifiers'
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/shared/ui/external'

export const ColumnActionsComponent = ({
	columnId,
	boardId
}: IBoardColumnIdentifiers) => {
	const [editOpen, setEditOpen] = useState(false)
	const [deleteOpen, setDeleteOpen] = useState(false)
	const t = useTranslations('column.actions')

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='none'
						size='none'
						className='cursor-pointer'
					>
						<MoreHorizontal />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onSelect={() => setEditOpen(true)}>
						<Edit />
						{t('edit')}
					</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => setDeleteOpen(true)}>
						<Trash2 />
						{t('delete')}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<EditColumnModal
				open={editOpen}
				onOpenChange={setEditOpen}
				columnId={columnId}
				boardId={boardId}
			/>

			<DeleteColumnModal
				open={deleteOpen}
				onOpenChange={setDeleteOpen}
				columnId={columnId}
				boardId={boardId}
			/>
		</>
	)
}

export const ColumnActions = memo(ColumnActionsComponent)
