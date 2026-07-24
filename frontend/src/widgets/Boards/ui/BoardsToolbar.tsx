'use client'

import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'

import {
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/ui/external'

import { BoardsSortOption } from '../model/lib/filterAndSortBoards'
import { BoardsToolbarProps } from '../model/types/BoardsProps'

export const BoardsToolbar = ({
	search,
	sort,
	onSearchChange,
	onSortChange
}: BoardsToolbarProps) => {
	const t = useTranslations('boards')

	return (
		<div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
			<div className='relative flex-1'>
				<Search className='absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
				<Input
					value={search}
					onChange={event => onSearchChange(event.target.value)}
					placeholder={t('searchPlaceholder')}
					className='pl-9'
				/>
			</div>
			<Select
				value={sort}
				onValueChange={value => onSortChange(value as BoardsSortOption)}
			>
				<SelectTrigger className='w-full sm:w-52'>
					<SelectValue placeholder={t('sortPlaceholder')} />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='updatedDesc'>
						{t('sort.updatedDesc')}
					</SelectItem>
					<SelectItem value='titleAsc'>
						{t('sort.titleAsc')}
					</SelectItem>
					<SelectItem value='titleDesc'>
						{t('sort.titleDesc')}
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}
