'use client'
import { useTranslations } from 'next-intl'

import { BoardList, BoardListSkeleton, useGetBoards } from '@/entities/Board'

import { CreateBoardModal } from '@/features/board'

import { useSidebar } from '@/shared/ui/external'

export const Boards = () => {
	const t = useTranslations('boards')
	const { state } = useSidebar()
	const { boards, isPending } = useGetBoards()

	return (
		<div className='py-8 px-4'>
			<div
				className={`mx-auto flex flex-col gap-4 transition-all
                ${state === 'collapsed' ? 'max-w-[1100px]' : 'max-w-[900px]'}`}
			>
				<div className='flex justify-between items-center'>
					<h3 className='font-bold text-2xl'>{t('title')}</h3>
					<CreateBoardModal />
				</div>
				{isPending || !boards ? (
					<BoardListSkeleton />
				) : (
					<BoardList boards={boards} />
				)}
			</div>
		</div>
	)
}
