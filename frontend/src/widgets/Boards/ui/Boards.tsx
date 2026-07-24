'use client'
import { LayoutDashboard, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'

import { BoardList, BoardListSkeleton, useGetBoards } from '@/entities/Board'

import { CreateBoardModal } from '@/features/board'

import { Separator } from '@/shared/ui/external'

import {
	BoardsSortOption,
	filterAndSortBoards
} from '../model/lib/filterAndSortBoards'

import { BoardsToolbar } from './BoardsToolbar'

export const Boards = () => {
	const t = useTranslations('boards')
	const { favoriteBoards, otherBoards, boardsPending } = useGetBoards()
	const [search, setSearch] = useState('')
	const [sort, setSort] = useState<BoardsSortOption>('updatedDesc')

	const filteredFavoriteBoards = useMemo(
		() => filterAndSortBoards(favoriteBoards ?? [], search, sort),
		[favoriteBoards, search, sort]
	)
	const filteredOtherBoards = useMemo(
		() => filterAndSortBoards(otherBoards ?? [], search, sort),
		[otherBoards, search, sort]
	)

	return (
		<div className='container mx-auto py-8 px-4'>
			<div className={`mx-auto flex flex-col gap-4 transition-all`}>
				{boardsPending ? (
					<BoardListSkeleton />
				) : (
					<div className='flex flex-col gap-8'>
						<BoardsToolbar
							search={search}
							sort={sort}
							onSearchChange={setSearch}
							onSortChange={setSort}
						/>

						{filteredFavoriteBoards.length > 0 && (
							<>
								<div className='flex flex-col gap-4'>
									<h4 className='flex items-center gap-2 font-bold text-xl sm:text-2xl'>
										<Star size={24} />
										{t('favorites')}
									</h4>
									<BoardList
										boards={filteredFavoriteBoards}
									/>
								</div>
								<Separator />
							</>
						)}

						<div className='flex flex-col gap-4'>
							<div className='flex justify-between items-center'>
								<h4 className='font-bold text-xl sm:text-2xl'>
									{t('title')}
								</h4>
								<CreateBoardModal />
							</div>
							{filteredOtherBoards.length > 0 ? (
								<BoardList boards={filteredOtherBoards} />
							) : (
								<div className='flex flex-col items-center justify-center py-16 text-center'>
									<div className='mb-4 rounded-full bg-slate-300 dark:bg-gray-100 p-4'>
										<LayoutDashboard className='w-8 h-8 text-muted-foreground' />
									</div>
									<h3 className='text-lg font-semibold mb-2'>
										{search
											? t('noSearchResultsTitle')
											: t('noBoardsTitle')}
									</h3>
									<p className='text-sm text-gray-400 mb-6 max-w-sm'>
										{search
											? t('noSearchResultsDescription')
											: t('noBoardsDescription')}
									</p>
									{!search && <CreateBoardModal />}
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
