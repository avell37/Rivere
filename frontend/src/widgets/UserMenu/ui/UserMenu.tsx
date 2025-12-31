'use client'
import { EllipsisVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useUserStore } from '@/entities/User/model/store/useUserStore'

import { SERVER_URL } from '@/shared/libs/constants/api.config'
import { customAvatar } from '@/shared/libs/customAvatar'
import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/shared/ui/external/Avatar/Avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/shared/ui/external/Dropdown/Dropdown'
import {
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/shared/ui/external/Sidebar/ui/Sidebar'

import { useLogout } from '../model/hooks/useLogout'

import { userMenuFields } from './UserFields'

export const UserMenu = () => {
	const user = useUserStore(state => state.user)
	const fields = userMenuFields()
	const router = useRouter()
	const { logoutUser, isPending } = useLogout()

	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton size='lg'>
								<Avatar className='h-8 w-8 rounded-full'>
									{user?.avatar ? (
										<AvatarImage
											src={`${SERVER_URL}${user?.avatar}`}
										/>
									) : (
										<AvatarFallback>
											{customAvatar(user?.username || '')}
										</AvatarFallback>
									)}
								</Avatar>
								<div className='flex flex-col leading-tight'>
									<span className='truncate font-medium'>
										{user?.nickname || ''}
									</span>
									<span className='text-xs'>
										{user?.email || ''}
									</span>
								</div>
								<div className='ml-auto'>
									<EllipsisVertical />
								</div>
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent className='w-58'>
							{fields.map(item => (
								<DropdownMenuItem
									key={item.id}
									disabled={item.id === 'logout' && isPending}
									onClick={() => {
										if (item.id === 'logout') logoutUser()
										else router.push(item.url)
									}}
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
