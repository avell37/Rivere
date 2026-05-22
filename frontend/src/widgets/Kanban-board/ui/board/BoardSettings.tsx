'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import {
	BoardMembersList,
	IBoard,
	SettingsTab,
	getSidebarItems,
	useGetAllBoardMembers
} from '@/entities/Board'

import { Button } from '@/shared/ui/external'

export const BoardSettings = ({ board }: { board: IBoard }) => {
	const t = useTranslations()
	const [tab, setTab] = useState<SettingsTab>('members')
	const { boardMembers, membersPending } = useGetAllBoardMembers(board.id)

	const sidebarItems = getSidebarItems(t)

	return (
		<div className='flex flex-col md:flex-row h-[70vh] md:h-[600px]'>
			<div className='md:w-64 md:border-r md:pr-3 border-b md:border-b-0 pb-3 md:pb-0 overflow-x-auto'>
				<div className='flex md:flex-col gap-1 min-w-max'>
					{sidebarItems?.map(item => (
						<Button
							key={item.value}
							onClick={() => setTab(item.value)}
							variant='none'
							size='none'
							className={`justify-start rounded-md px-3 py-2 text-left transition 
								hover:bg-muted whitespace-nowrap 
								${tab === item.value && 'bg-muted font-medium'}`}
						>
							{item.icon}
							{item.label}
						</Button>
					))}
				</div>
			</div>
			<div className='flex-1 overflow-y-auto pt-4 md:pt-0 md:pl-6'>
				{tab === 'members' && (
					<BoardMembersList
						members={boardMembers}
						membersPending={membersPending}
						boardId={board.id}
					/>
				)}
			</div>
		</div>
	)
}
