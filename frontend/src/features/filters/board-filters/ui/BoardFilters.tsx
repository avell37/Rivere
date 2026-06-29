'use client'
import { Search, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useGetAllBoardMembers } from '@/entities/Board'

import { S3_URL } from '@/shared/libs'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Separator
} from '@/shared/ui/external'
import { Button, Input } from '@/shared/ui/external'
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

interface BoardFiltersProps {
	boardId: string
}

export const BoardFilters = ({ boardId }: BoardFiltersProps) => {
	const t = useTranslations()
	const {
		search,
		priorities,
		status,
		deadline,
		assigneeId,
		setSearch,
		togglePriority,
		setStatus,
		setDeadline,
		setAssigneeId,
		reset
	} = useBoardFiltersStore()

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
							<button
								key={value}
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
							</button>
						)
					)}
				</div>
			</div>
			<Separator />
			<div className='flex flex-col gap-1.5'>
				<p className='text-xs font-medium text-muted-foreground uppercase tracking-wide'>
					{t('board.filters.status')}
				</p>
				<div className='flex rounded-md border overflow-hidden'>
					{STATUS_OPTIONS.map(({ value, labelKey }) => (
						<button
							key={value}
							onClick={() => setStatus(value)}
							className={cn(
								'flex-1 py-1 text-xs font-medium transition-colors',
								status === value
									? 'bg-primary text-primary-foreground'
									: 'text-muted-foreground hover:bg-accent'
							)}
						>
							{t(labelKey)}
						</button>
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
						<button
							key={value}
							onClick={() => setDeadline(value)}
							className={cn(
								'px-2 py-1.5 rounded-md text-xs text-left transition-colors',
								deadline === value
									? 'bg-primary/10 text-primary font-medium'
									: 'text-muted-foreground hover:bg-accent'
							)}
						>
							{t(labelKey)}
						</button>
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
								<button
									key={member.userId}
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
								</button>
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
