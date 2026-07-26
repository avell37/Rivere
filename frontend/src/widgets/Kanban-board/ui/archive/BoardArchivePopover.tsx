'use client'

import { Archive, ArchiveRestore, Loader2, Trash2 } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'

import { useBoardPermissions } from '@/entities/Board'
import {
	IArchivedCard,
	useGetArchivedCards,
	usePermanentDeleteCardMutation,
	useRestoreCardMutation
} from '@/entities/Card'
import {
	IArchivedColumn,
	useGetArchivedColumns,
	usePermanentDeleteColumnMutation,
	useRestoreColumnMutation
} from '@/entities/Column'

import { Alert } from '@/shared/ui/custom'
import {
	Button,
	PopoverContent,
	PopoverMain,
	PopoverTrigger,
	ScrollArea
} from '@/shared/ui/external'
import { BoardPermission, cn, formatDate } from '@/shared/utils'

const ArchiveRowActions = ({
	canManage,
	isPending,
	onRestore,
	onPermanentDelete,
	permanentDeleteTitle,
	permanentDeleteDescription,
	permanentDeleteAction,
	cancelText
}: {
	canManage: boolean
	isPending: boolean
	onRestore: () => void
	onPermanentDelete: () => void
	permanentDeleteTitle: string
	permanentDeleteDescription: string
	permanentDeleteAction: string
	cancelText: string
}) => {
	const t = useTranslations('board.archive')
	const [deleteOpen, setDeleteOpen] = useState(false)

	if (!canManage) return null

	return (
		<div className='flex shrink-0 items-center gap-0.5'>
			<Button
				type='button'
				size='sm'
				variant='ghost'
				className='size-8 p-0'
				disabled={isPending}
				title={t('restore')}
				onClick={onRestore}
			>
				<ArchiveRestore className='size-4' />
			</Button>
			<Alert
				open={deleteOpen}
				onOpenChange={setDeleteOpen}
				trigger={
					<Button
						type='button'
						size='sm'
						variant='ghost'
						className='size-8 p-0 text-destructive hover:text-destructive'
						disabled={isPending}
						title={t('permanentDelete')}
						onClick={e => e.stopPropagation()}
					>
						<Trash2 className='size-4' />
					</Button>
				}
				title={permanentDeleteTitle}
				description={permanentDeleteDescription}
				actionText={permanentDeleteAction}
				cancelText={cancelText}
				isPending={isPending}
				onSubmit={() => {
					onPermanentDelete()
					setDeleteOpen(false)
				}}
			/>
		</div>
	)
}

const ArchivedCardRow = ({
	card,
	boardId,
	canManage
}: {
	card: IArchivedCard
	boardId: string
	canManage: boolean
}) => {
	const t = useTranslations('board.archive')
	const locale = useLocale()
	const { restoreCard, restoreCardPending } = useRestoreCardMutation(boardId)
	const { permanentDeleteCard, permanentDeleteCardPending } =
		usePermanentDeleteCardMutation(boardId)

	const isPending = restoreCardPending || permanentDeleteCardPending

	return (
		<div className='flex items-start gap-2 rounded-md p-2 hover:bg-accent/50 transition-colors'>
			<div className='min-w-0 flex-1'>
				<p className='truncate text-sm font-medium'>{card.title}</p>
				<p className='mt-0.5 truncate text-[11px] text-muted-foreground'>
					{t('column', { name: card.column.title })}
					{card.archivedAt && (
						<>
							{' · '}
							{t('archivedAt', {
								date: formatDate(card.archivedAt, locale)
							})}
						</>
					)}
				</p>
			</div>
			<ArchiveRowActions
				canManage={canManage}
				isPending={isPending}
				onRestore={() =>
					restoreCard(card.id, {
						onSuccess: () => toast.success(t('restoreCardSuccess'))
					})
				}
				onPermanentDelete={() =>
					permanentDeleteCard(card.id, {
						onSuccess: () =>
							toast.success(t('permanentDeleteCardSuccess'))
					})
				}
				permanentDeleteTitle={t('permanentDeleteCardTitle')}
				permanentDeleteDescription={t('permanentDeleteCardDescription')}
				permanentDeleteAction={t('permanentDeleteAction')}
				cancelText={t('permanentDeleteCancel')}
			/>
		</div>
	)
}

const ArchivedColumnRow = ({
	column,
	boardId,
	canManage
}: {
	column: IArchivedColumn
	boardId: string
	canManage: boolean
}) => {
	const t = useTranslations('board.archive')
	const locale = useLocale()
	const { restoreColumn, restoreColumnPending } =
		useRestoreColumnMutation(boardId)
	const { permanentDeleteColumn, permanentDeleteColumnPending } =
		usePermanentDeleteColumnMutation(boardId)

	const isPending = restoreColumnPending || permanentDeleteColumnPending

	return (
		<div className='flex items-start gap-2 rounded-md p-2 hover:bg-accent/50 transition-colors'>
			<div className='min-w-0 flex-1'>
				<p className='truncate text-sm font-medium'>{column.title}</p>
				<p className='mt-0.5 truncate text-[11px] text-muted-foreground'>
					{t('cardsInColumn', { count: column._count.cards })}
					{column.archivedAt && (
						<>
							{' · '}
							{t('archivedAt', {
								date: formatDate(column.archivedAt, locale)
							})}
						</>
					)}
				</p>
			</div>
			<ArchiveRowActions
				canManage={canManage}
				isPending={isPending}
				onRestore={() =>
					restoreColumn(column.id, {
						onSuccess: () => toast.success(t('restoreColumnSuccess'))
					})
				}
				onPermanentDelete={() =>
					permanentDeleteColumn(column.id, {
						onSuccess: () =>
							toast.success(t('permanentDeleteColumnSuccess'))
					})
				}
				permanentDeleteTitle={t('permanentDeleteColumnTitle')}
				permanentDeleteDescription={t(
					'permanentDeleteColumnDescription',
					{ count: column._count.cards }
				)}
				permanentDeleteAction={t('permanentDeleteAction')}
				cancelText={t('permanentDeleteCancel')}
			/>
		</div>
	)
}

export const BoardArchivePopover = ({ boardId }: { boardId: string }) => {
	const t = useTranslations('board.archive')
	const { can } = useBoardPermissions(boardId)
	const { archivedCards, archivedCardsPending } = useGetArchivedCards(boardId)
	const { archivedColumns, archivedColumnsPending } =
		useGetArchivedColumns(boardId)

	const totalCount = archivedCards.length + archivedColumns.length
	const isPending = archivedCardsPending || archivedColumnsPending

	if (!isPending && totalCount === 0) return null

	return (
		<PopoverMain>
			<PopoverTrigger asChild>
				<Button
					type='button'
					variant='none'
					size='none'
					className='relative p-2 rounded-md hover:bg-accent/80 dark:hover:bg-zinc-500 transition'
					title={t('title')}
					disabled={isPending}
				>
					{isPending ? (
						<Loader2 className='size-[18px] animate-spin' />
					) : (
						<Archive size={18} />
					)}
					{!isPending && totalCount > 0 && (
						<span
							className={cn(
								'absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1',
								'bg-muted text-muted-foreground text-[10px] font-bold'
							)}
						>
							{totalCount}
						</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-80 p-0' align='end' sideOffset={8}>
				<div className='border-b px-3 py-2.5'>
					<p className='text-sm font-semibold'>{t('title')}</p>
					<p className='mt-0.5 text-xs text-muted-foreground'>
						{t('description')}
					</p>
				</div>
				{isPending ? (
					<div className='flex items-center justify-center gap-2 px-3 py-8 text-sm text-muted-foreground'>
						<Loader2 className='size-4 animate-spin' />
						{t('loading')}
					</div>
				) : (
					<ScrollArea className='max-h-96'>
						<div className='space-y-3 p-2'>
						{archivedColumns.length > 0 && (
							<div>
								<p className='px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground'>
									{t('columnsSection')}
								</p>
								<div className='space-y-0.5'>
									{archivedColumns.map(column => (
										<ArchivedColumnRow
											key={column.id}
											column={column}
											boardId={boardId}
											canManage={can(
												BoardPermission.DELETE_COLUMN
											)}
										/>
									))}
								</div>
							</div>
						)}

						{archivedCards.length > 0 && (
							<div>
								<p className='px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground'>
									{t('cardsSection')}
								</p>
								<div className='space-y-0.5'>
									{archivedCards.map(card => (
										<ArchivedCardRow
											key={card.id}
											card={card}
											boardId={boardId}
											canManage={can(
												BoardPermission.DELETE_CARD
											)}
										/>
									))}
								</div>
							</div>
						)}
					</div>
				</ScrollArea>
				)}
			</PopoverContent>
		</PopoverMain>
	)
}
