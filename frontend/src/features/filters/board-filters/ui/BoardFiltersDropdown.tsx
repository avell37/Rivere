'use client'
import { SlidersHorizontal } from 'lucide-react'

import {
	PopoverContent,
	PopoverMain,
	PopoverTrigger
} from '@/shared/ui/external'
import { Button } from '@/shared/ui/external'
import { cn } from '@/shared/utils'

import {
	useActiveFiltersCount,
	useHasActiveFilters
} from '../model/store/useBoardFiltersStore'

import { BoardFilters } from './BoardFilters'

interface BoardFiltersDropdownProps {
	boardId: string
	className?: string
}

export const BoardFiltersDropdown = ({
	boardId,
	className
}: BoardFiltersDropdownProps) => {
	const hasActive = useHasActiveFilters()
	const activeCount = useActiveFiltersCount()

	return (
		<PopoverMain>
			<PopoverTrigger asChild>
				<Button
					type='button'
					variant='none'
					size='none'
					className={cn(
						'relative p-2 rounded-md hover:bg-accent/80 dark:hover:bg-zinc-500 transition',
						hasActive && 'text-primary',
						className
					)}
				>
					<SlidersHorizontal size={18} />
					{hasActive && (
						<span className='absolute -top-1 -right-1 flex items-center justify-center size-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold'>
							{activeCount}
						</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-3' align='end' sideOffset={8}>
				<BoardFilters boardId={boardId} />
			</PopoverContent>
		</PopoverMain>
	)
}
