'use client'
import { useTranslations } from 'next-intl'

import { useSidebar } from '@/shared/ui/external'

import { useGetBoards } from '../model/hooks/useGetBoards'

import { BoardList } from './BoardList'
import { BoardListSkeleton } from './BoardListSkeleton'

export const Boards = () => {
	const t = useTranslations('boards')
	const { state } = useSidebar()
	const { boards, isPending } = useGetBoards()

	return (
		<div className='flex justify-center py-8 px-4'>
			<div
				className={`flex flex-col gap-4 w-full transition-all
                ${state === 'collapsed' ? 'max-w-[1100px]' : 'max-w-[900px]'}`}
			>
				<div className='flex justify-between items-center'>
					<h3 className='font-bold text-xl'>{t('title')}</h3>
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
