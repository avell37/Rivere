'use client'
import { Edit, MoreHorizontal, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { DeleteBoardModal, EditBoardModal } from '@/features/board'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/shared/ui/external'

export const BoardActions = ({ boardId }: { boardId: string }) => {
	const [editOpen, setEditOpen] = useState(false)
	const [deleteOpen, setDeleteOpen] = useState(false)
	const t = useTranslations('board.actions')

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='none'
						size='none'
						className='p-2 rounded-md hover:bg-white/70 dark:hover:bg-zinc-500 transition'
					>
						<MoreHorizontal />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className='mr-3'>
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

			<EditBoardModal
				open={editOpen}
				onOpenChange={setEditOpen}
				boardId={boardId}
			/>

			<DeleteBoardModal
				open={deleteOpen}
				onOpenChange={setDeleteOpen}
				boardId={boardId}
			/>
		</>
	)
}
