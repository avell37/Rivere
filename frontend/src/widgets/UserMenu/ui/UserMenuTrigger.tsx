'use client'
import { EllipsisVertical } from 'lucide-react'

import { UserAvatar } from '@/entities/User'

import { UserMenuTriggerProps } from '../model/types/UserMenuProps'

export const UserMenuTrigger = ({ user, isMainPage }: UserMenuTriggerProps) => {
	return (
		<div className='flex items-center justify-start gap-2 h-auto p-2'>
			<UserAvatar avatar={user?.avatar} username={user?.username} />
			<div className='flex flex-col leading-tight max-sm:hidden'>
				<span
					className={`truncate font-medium text-left ${isMainPage ? 'text-white' : 'text-black dark:text-white'}`}
				>
					{user?.nickname}
				</span>
				<span
					className={`text-xs font-light ${isMainPage ? 'text-white' : 'text-black dark:text-white'}`}
				>
					{user?.email}
				</span>
			</div>
			<div className='ml-auto max-sm:hidden'>
				<EllipsisVertical
					className={`${isMainPage ? 'text-white' : 'text-black dark:text-white'}`}
				/>
			</div>
		</div>
	)
}
