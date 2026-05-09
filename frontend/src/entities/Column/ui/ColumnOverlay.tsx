'use client'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { MoreHorizontal, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { CardOverlayList } from '@/entities/Card/ui/CardOverlayList'

import { Button } from '@/shared/ui/external'

import { ColumnOverlayProps } from '../model/types/ColumnProps'

export const ColumnOverlay = ({ column }: ColumnOverlayProps) => {
	const t = useTranslations('card.create')

	return (
		<div className='flex flex-col justify-between space-y-6 gap-4'>
			<li className='w-78 flex flex-col gap-3 break-all bg-white/70 dark:bg-neutral-900 p-2 rounded-md'>
				<div className='relative p-2 flex justify-center gap-2 dark:text-white'>
					<div className='flex justify-center items-center gap-2'>
						<h2 className='text-lg font-semibold'>
							{column.title}
						</h2>
						<span className='text-sm text-gray-500'>
							{column.cards?.length ?? 0}
						</span>
					</div>
					<div className='absolute right-2 top-3'>
						<MoreHorizontal size={16} />
					</div>
				</div>
				<ScrollArea.Root className='relative px-1'>
					<ScrollArea.Viewport className='flex flex-col gap-2 max-h-164 overflow-y-auto'>
						<div className='flex flex-col gap-2 rounded-lg'>
							<CardOverlayList cards={column.cards} />
						</div>
					</ScrollArea.Viewport>
					<ScrollArea.Scrollbar
						orientation='vertical'
						className='absolute right-20 top-0 bottom-0 w-2 translate-x-full'
					>
						<ScrollArea.Thumb className='block w-full bg-white/60 rounded-full' />
					</ScrollArea.Scrollbar>
				</ScrollArea.Root>
				<Button
					type='button'
					variant='none'
					size='none'
					className='p-2 border cursor-pointer bg-white dark:bg-black hover:bg-background'
				>
					<Plus />
					{t('heading')}
				</Button>
			</li>
		</div>
	)
}
