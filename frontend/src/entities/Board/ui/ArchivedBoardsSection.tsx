'use client'

import { Archive, ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { ArchivedBoardItem, useGetArchivedBoards } from '@/entities/Board'

import { Separator } from '@/shared/ui/external'
import { cn } from '@/shared/utils'

export const ArchivedBoardsSection = () => {
	const t = useTranslations('boards.archive')
	const { archivedBoards, archivedBoardsPending } = useGetArchivedBoards()
	const [open, setOpen] = useState(false)

	if (archivedBoardsPending) return null
	if (archivedBoards.length === 0) return null

	return (
		<section className='flex flex-col gap-4'>
			<Separator />
			<button
				type='button'
				onClick={() => setOpen(prev => !prev)}
				className='flex items-center justify-between gap-3 w-full text-left group'
			>
				<h4 className='flex items-center gap-2 font-bold text-xl sm:text-2xl'>
					<Archive size={22} className='text-muted-foreground' />
					{t('title')}
					<span className='text-sm font-normal text-muted-foreground'>
						({archivedBoards.length})
					</span>
				</h4>
				<ChevronDown
					className={cn(
						'size-5 text-muted-foreground transition-transform shrink-0',
						open && 'rotate-180'
					)}
				/>
			</button>

			{open && (
				<div className='animate-in fade-in slide-in-from-top-1 duration-200'>
					<p className='text-sm text-muted-foreground mb-4 max-w-xl'>
						{t('description')}
					</p>
					<div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4'>
						{archivedBoards.map(board => (
							<ArchivedBoardItem key={board.id} board={board} />
						))}
					</div>
				</div>
			)}
		</section>
	)
}
