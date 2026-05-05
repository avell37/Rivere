'use client'
import { LayoutDashboard, Star } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { BoardList, BoardListSkeleton, useGetBoards } from '@/entities/Board'

import { CreateBoardModal } from '@/features/board'

import { Separator } from '@/shared/ui/external'

export const Boards = () => {
	const t = useTranslations('boards')
	const { favoriteBoards, otherBoards, isPending } = useGetBoards()

	return (
		<div className='container mx-auto py-8 px-4'>
			<div className={`mx-auto flex flex-col gap-4 transition-all`}>
				{isPending ? (
					<BoardListSkeleton />
				) : (
					<div className='flex flex-col gap-8'>
						{favoriteBoards && favoriteBoards.length > 0 && (
							<>
								<div className='flex flex-col gap-4'>
									<h4 className='flex items-center gap-2 font-bold text-xl sm:text-2xl'>
										<Star size={24} />
										{t('favorites')}
									</h4>
									<BoardList boards={favoriteBoards} />
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
							{otherBoards && otherBoards.length > 0 ? (
								<BoardList boards={otherBoards ?? []} />
							) : (
								<div className='flex flex-col items-center justify-center py-16 text-center'>
									<div className='mb-4 rounded-full bg-slate-300 dark:bg-gray-100 p-4'>
										<LayoutDashboard className='w-8 h-8 dark:text-gray-400' />
									</div>
									<h3 className='text-lg font-semibold mb-2'>
										{t('noBoardsTitle')}
									</h3>
									<p className='text-sm text-gray-400 mb-6 max-w-sm'>
										{t('noBoardsDescription')}
									</p>
									<CreateBoardModal />
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
