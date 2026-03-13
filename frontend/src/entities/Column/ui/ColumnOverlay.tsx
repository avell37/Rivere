import { MoreHorizontal, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { CardOverlayList } from '@/entities/Card/ui/CardOverlayList'

import { Button } from '@/shared/ui/external'

import { ColumnOverlayProps } from '../model/types/ColumnProps'

export const ColumnOverlay = ({ column }: ColumnOverlayProps) => {
	const t = useTranslations('card.create')

	return (
		<ul className='w-76 flex flex-col gap-3 break-all bg-white/70 dark:bg-neutral-900 p-2 rounded-md'>
			<div className='relative p-2 flex justify-center gap-2 dark:text-white'>
				<div className='flex items-center gap-2'>
					<h2 className='text-lg font-semibold'>{column.title}</h2>
					<span className='text-sm text-gray-500'>
						{column.cards?.length ?? 0}
					</span>
				</div>
				<div className='absolute right-2 top-3'>
					<MoreHorizontal size={16} />
				</div>
			</div>
			<CardOverlayList cards={column.cards} />
			<Button
				variant='none'
				size='none'
				className='p-2 border cursor-pointer hover:bg-background'
			>
				<Plus />
				{t('heading')}
			</Button>
		</ul>
	)
}
