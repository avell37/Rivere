'use client'
import { EllipsisVertical } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { UserAvatar, useUserStore } from '@/entities/User'

import { LanguageSwitcher, ThemeSwitcher } from '@/shared/ui/custom'
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/shared/ui/external'

import { useLogout } from '../model/hooks/useLogout'
import { MenuItem } from '../model/types/Menuitem'

import { userMenuFields } from './UserFields'
import { UserMenuSkeleton } from './UserMenuSkeleton'

export const UserMenu = () => {
	const user = useUserStore(state => state.user)
	const t = useTranslations()
	const fields = userMenuFields(t)
	const router = useRouter()
	const { logoutUser, isPending } = useLogout()

	const handleMenuClick = (item: MenuItem) => {
		if (item.id === 'logout') {
			logoutUser()
			return
		}
		router.push(item.url)
	}

	if (!user) return <UserMenuSkeleton />

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className='max-sm:p-0'>
				<Button
					variant='ghost'
					size='none'
					className='flex items-center justify-start gap-2 h-auto p-2'
				>
					<UserAvatar
						avatar={user?.avatar}
						username={user?.username}
					/>
					<div className='flex flex-col leading-tight max-sm:hidden'>
						<span className='truncate font-medium text-left text-white'>
							{user?.nickname}
						</span>
						<span className='text-xs font-light text-white'>
							{user?.email}
						</span>
					</div>
					<div className='ml-auto max-sm:hidden'>
						<EllipsisVertical className='text-white' />
					</div>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-36 sm:w-58 z-100'>
				<DropdownMenuGroup>
					<DropdownMenuLabel className='text-xs text-gray-400'>
						{t('dropdownUserMenu.customize')}
					</DropdownMenuLabel>
					<ThemeSwitcher />
					<LanguageSwitcher />
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuLabel className='text-xs text-gray-400'>
						{t('dropdownUserMenu.account')}
					</DropdownMenuLabel>
					{fields.map(item => (
						<DropdownMenuItem
							key={item.id}
							disabled={item.id === 'logout' && isPending}
							onClick={() => handleMenuClick(item)}
						>
							<item.icon />
							{item.title}
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
