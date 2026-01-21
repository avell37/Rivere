'use client'
import { EllipsisVertical } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { UserAvatar, useUserStore } from '@/entities/User'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/shared/ui/external'

import { useLogout } from '../model/hooks/useLogout'

import { userMenuFields } from './UserFields'
import { UserMenuSkeleton } from './UserMenuSkeleton'

export const UserMenu = () => {
	const user = useUserStore(state => state.user)
	const t = useTranslations()
	const fields = userMenuFields(t)
	const router = useRouter()
	const { logoutUser, isPending } = useLogout()

	const handleMenuClick = (item: any) => {
		if (item.id === 'logout') {
			logoutUser()
			return
		}
		router.push(item.url)
	}

	if (!user) return <UserMenuSkeleton />

	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton size='lg'>
								<UserAvatar
									avatar={user?.avatar}
									username={user?.username}
								/>
								<div className='flex flex-col leading-tight'>
									<span className='truncate font-medium'>
										{user?.nickname}
									</span>
									<span className='text-xs'>
										{user?.email}
									</span>
								</div>
								<div className='ml-auto'>
									<EllipsisVertical />
								</div>
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-58 z-100'>
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
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	)
}
