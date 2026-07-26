'use client'
import { Search, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

import { useBoardStore, useGetAllBoardMembers } from '@/entities/Board'
import { ICardTag } from '@/entities/Card'

import { S3_URL } from '@/shared/libs'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Input,
	Separator
} from '@/shared/ui/external'
import { cn } from '@/shared/utils'

import {
	DEADLINE_OPTIONS,
	PRIORITIES,
	STATUS_OPTIONS
} from '../model/lib/filtersOptions'
import {
	useActiveFiltersCount,
	useBoardFiltersStore,
	useHasActiveFilters
} from '../model/store/useBoardFiltersStore'

export const BoardFilters = ({ boardId }: { boardId: string }) => {
	const t = useTranslations()
	const {
		search,
		priorities,
		tagIds,
		status,
		deadline,
		assigneeId,
		setSearch,
		togglePriority,
		toggleTagId,
		setStatus,
		setDeadline,
		setAssigneeId,
		reset
	} = useBoardFiltersStore()

	const columns = useBoardStore(state => state.columns)

	const boardTags = useMemo(() => {
		const tags = new Map<string, ICardTag>()

		for (const column of columns) {
			for (const card of column.cards) {
				for (const tag of card.tags ?? []) {
					tags.set(tag.id, tag)
				}
			}
		}

		return Array.from(tags.values()).sort((a, b) =>
			a.title.localeCompare(b.title)
		)
	}, [columns])

	const hasActive = useHasActiveFilters()
	const activeCount = useActiveFiltersCount()

	const { boardMembers } = useGetAllBoardMembers(boardId)

	return (
		<div className='flex flex-col gap-3 w-72'>
			<div className='relative'>
				<Search className='absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none' />
				<Input
					value={search}
					onChange={e => setSearch(e.target.value)}
					placeholder={t('board.filters.search')}
					className='h-8 pl-8 text-sm'
				/>
			</div>
			<Separator />
			<div className='flex flex-col gap-1.5'>
				<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>
					{t('board.filters.priority')}
				</p>
				<div className='flex gap-1.5'>
					{PRIORITIES.map(
						({ value, labelKey, baseClass, activeClass }) => (
							<Button
								key={value}
								type='button'
								variant='none'
								size='none'
								onClick={() => togglePriority(value)}
								className={cn(
									'flex-1 px-2 py-1 rounded-md border text-xs font-medium transition-all',
									baseClass,
									priorities.includes(value)
										? activeClass
										: 'opacity-60 hover:opacity-100'
								)}
							>
								{t(labelKey)}
							</Button>
						)
					)}
				</div>
			</div>
			{boardTags.length > 0 && (
				<>
					<Separator />
					<div className='flex flex-col gap-1.5'>
						<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>
							{t('board.filters.tags')}
						</p>
						<div className='flex flex-wrap gap-1.5'>
							{boardTags.map(tag => (
								<Button
									key={tag.id}
									type='button'
									variant='none'
									size='none'
									onClick={() => toggleTagId(tag.id)}
									className={cn(
										'rounded-md px-2 py-1 text-xs font-medium transition-all border',
										tagIds.includes(tag.id)
											? 'border-primary/40 ring-1 ring-primary/30'
											: 'border-transparent opacity-80 hover:opacity-100'
									)}
									style={{ backgroundColor: tag.background }}
								>
									{tag.title}
								</Button>
							))}
						</div>
					</div>
				</>
			)}
			<Separator />
			<div className='flex flex-col gap-1.5'>
				<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>
					{t('board.filters.status')}
				</p>
				<div className='flex rounded-md border overflow-hidden'>
					{STATUS_OPTIONS.map(({ value, labelKey }) => (
						<Button
							key={value}
							type='button'
							variant='none'
							size='none'
							onClick={() => setStatus(value)}
							className={cn(
								'flex-1 py-1 text-xs font-medium transition-colors',
								status === value
									? 'bg-primary text-primary-foreground'
									: 'text-muted-foreground hover:bg-accent'
							)}
						>
							{t(labelKey)}
						</Button>
					))}
				</div>
			</div>
			<Separator />
			<div className='flex flex-col gap-1.5'>
				<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>
					{t('board.filters.deadline')}
				</p>
				<div className='flex flex-col gap-0.5'>
					{DEADLINE_OPTIONS.map(({ value, labelKey }) => (
						<Button
							key={value}
							type='button'
							variant='none'
							size='none'
							onClick={() => setDeadline(value)}
							className={cn(
								'flex flex-col justify-start items-start px-2 py-1.5 rounded-md text-xs text-left transition-colors',
								deadline === value
									? 'bg-primary/10 text-primary font-medium'
									: 'text-muted-foreground hover:bg-accent'
							)}
						>
							{t(labelKey)}
						</Button>
					))}
				</div>
			</div>
			{boardMembers.length > 0 && (
				<>
					<Separator />
					<div className='flex flex-col gap-1.5'>
						<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>
							{t('board.filters.assignee')}
						</p>
						<div className='flex flex-wrap gap-1.5'>
							{boardMembers.map(member => (
								<Button
									key={member.userId}
									type='button'
									variant='none'
									size='none'
									onClick={() =>
										setAssigneeId(
											assigneeId === member.userId
												? null
												: member.userId
										)
									}
									className={cn(
										'flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs transition-all',
										assigneeId === member.userId
											? 'bg-primary/10 border-primary/40 text-primary'
											: 'border-border text-muted-foreground hover:bg-accent opacity-70 hover:opacity-100'
									)}
								>
									<Avatar className='size-4 rounded-full'>
										<AvatarImage
											src={`${S3_URL}${member.user.avatar}`}
											alt={member.user.nickname}
										/>
										<AvatarFallback className='text-[8px]'>
											{member.user.nickname
												.slice(0, 2)
												.toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<span>{member.user.nickname}</span>
								</Button>
							))}
						</div>
					</div>
				</>
			)}
			{hasActive && (
				<>
					<Separator />
					<Button
						variant='ghost'
						size='sm'
						onClick={reset}
						className='w-full gap-1.5 text-muted-foreground hover:text-foreground'
					>
						<X className='size-3.5' />
						{t('board.filters.clear')}
						<span className='ml-auto bg-primary/15 text-primary text-[10px] font-bold rounded-full px-1.5 py-0.5'>
							{activeCount}
						</span>
					</Button>
				</>
			)}
		</div>
	)
}
