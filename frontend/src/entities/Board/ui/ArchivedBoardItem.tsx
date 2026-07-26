'use client'

import { ArchiveRestore } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { IBoard, useBoardItem, useRestoreBoardMutation } from '@/entities/Board'

import { Button } from '@/shared/ui/external'
import { formatDate } from '@/shared/utils'

export const ArchivedBoardItem = ({ board }: { board: IBoard }) => {
	const { backgroundStyle } = useBoardItem(board.background)
	const { restoreBoard, restoreBoardPending } = useRestoreBoardMutation()
	const t = useTranslations('boards.archive')
	const locale = useLocale()

	const archivedDate = board.archivedAt
		? formatDate(board.archivedAt, locale)
		: null

	return (
		<div className='flex flex-col relative rounded-xl overflow-hidden border border-border/60 bg-card/80 backdrop-blur-sm max-w-[260px] w-full min-h-[120px] opacity-90'>
			<div
				className='h-[72px] grayscale-[0.35] saturate-75'
				style={backgroundStyle}
			/>
			<div className='p-3 flex flex-col gap-2 flex-1'>
				<div className='min-w-0'>
					<h3 className='font-semibold text-sm truncate'>
						{board.title}
					</h3>
					{archivedDate && (
						<p className='text-[11px] text-muted-foreground mt-0.5'>
							{t('archivedAt', { date: archivedDate })}
						</p>
					)}
				</div>
				<Button
					type='button'
					size='sm'
					variant='outline'
					className='w-full gap-1.5 text-xs h-8'
					disabled={restoreBoardPending}
					onClick={() =>
						restoreBoard(board.id, {
							onSuccess: () => toast.success(t('restoreSuccess'))
						})
					}
				>
					<ArchiveRestore className='size-3.5 shrink-0' />
					{t('restore')}
				</Button>
			</div>
		</div>
	)
}
