'use client'

import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { EmptyState } from '@/shared/ui/custom'
import {
	Button,
	Input,
	PopoverAnchor,
	PopoverContent,
	PopoverMain
} from '@/shared/ui/external'
import { cn } from '@/shared/utils'

import { useBoardCardSearch } from '../../model/hooks/useBoardCardSearch'

export const BoardCardSearch = () => {
	const t = useTranslations('board.search')
	const { results, showResults, search, openCard, setSearch, setOpen } =
		useBoardCardSearch()

	return (
		<PopoverMain
			open={showResults}
			onOpenChange={next => {
				if (!search.trim()) {
					setOpen(false)
					return
				}

				setOpen(next)
			}}
		>
			<PopoverAnchor asChild>
				<div className='relative hidden md:block w-full max-w-xs'>
					<Search className='pointer-events-none absolute left-2.5 top-1/2 z-10 size-3.5 -translate-y-1/2 text-muted-foreground' />
					<Input
						value={search}
						onChange={event => {
							const value = event.target.value
							setSearch(value)
							setOpen(value.trim().length > 0)
						}}
						onFocus={() => {
							if (search.trim()) setOpen(true)
						}}
						placeholder={t('placeholder')}
						className='h-8 bg-background/80 pl-8 text-sm'
					/>
				</div>
			</PopoverAnchor>
			<PopoverContent
				className='w-(--radix-popover-anchor-width) p-0'
				align='start'
				sideOffset={4}
				onOpenAutoFocus={event => event.preventDefault()}
			>
				{results.length === 0 ? (
					<EmptyState variant='inline' className='px-3 py-2'>
						{t('empty')}
					</EmptyState>
				) : (
					<ul>
						{results.map(({ card, columnTitle }) => (
							<li key={card.id}>
								<Button
									type='button'
									variant='none'
									size='none'
									className={cn(
										'flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left text-sm',
										'transition-colors hover:bg-accent'
									)}
									onClick={() => openCard(card.id)}
								>
									<span className='w-full truncate font-medium'>
										{card.title}
									</span>
									<span className='w-full truncate text-xs text-muted-foreground'>
										{columnTitle}
									</span>
								</Button>
							</li>
						))}
					</ul>
				)}
			</PopoverContent>
		</PopoverMain>
	)
}
