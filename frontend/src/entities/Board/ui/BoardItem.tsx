'use client'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { API_URL } from '@/shared/libs'

import { useBoardItem } from '../model/hooks/useBoardItem'
import { BoardItemProps } from '../model/types/BoardProps'

import { BoardFavoriteButton } from './BoardFavoriteButton'

export const BoardItem = ({
	id,
	title,
	members,
	background,
	isFavorite
}: BoardItemProps) => {
	const { backgroundStyle } = useBoardItem(background)
	const t = useTranslations('board')

	return (
		<Link
			href={`${API_URL.boards()}${id}`}
			className='flex flex-col relative rounded-md overflow-hidden cursor-pointer transition-all group min-w-[200px] w-full h-30'
		>
			<BoardFavoriteButton
				boardId={id}
				isFavorite={isFavorite}
				buttonClassname='absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition'
			/>
			<div className='rounded-t-md h-30' style={backgroundStyle} />
			<div className='p-2 text-white flex flex-col items-start group rounded-b-md bg-zinc-800/30 dark:bg-zinc-800/80'>
				<h3 className='font-semibold text-base truncate max-w-[180px]'>
					{title}
				</h3>
				<span className='text-xs'>
					{t('members', { count: members })}
				</span>
			</div>
			<div className='absolute inset-0 group-hover:bg-black/35 transition-colors' />
		</Link>
	)
}
