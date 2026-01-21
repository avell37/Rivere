import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { API_URL } from '@/shared/libs'

import { useGetBoard } from '../model/hooks/useGetBoard'
import { BoardItemProps } from '../model/types/BoardProps'

export const BoardItem = ({ id, title, members }: BoardItemProps) => {
	const { backgroundStyle } = useGetBoard(id)
	const t = useTranslations('board')

	return (
		<Link
			href={`${API_URL.boards()}${id}`}
			className='flex flex-col relative rounded-md overflow-hidden cursor-pointer transition-all group min-w-[200px] w-full h-30'
		>
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
