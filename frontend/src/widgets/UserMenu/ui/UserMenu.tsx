'use client'
import { EllipsisVertical, LogOut, Settings, User } from 'lucide-react'

import { useGetUser } from '@/features/auth/model/hooks/useGetUser'

import {
	Avatar,
	AvatarFallback,
	AvatarImage
} from '@/shared/ui/external/Avatar/Avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/shared/ui/external/Dropdown/Dropdown'
import {
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/shared/ui/external/Sidebar/ui/Sidebar'

export const UserMenu = () => {
	const { data: user } = useGetUser()

	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton size='lg'>
								<Avatar className='h-8 w-8'>
									<AvatarImage></AvatarImage>
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<div className='flex flex-col leading-tight'>
									<span className='truncate font-medium'>
										{user?.displayUsername || ''}
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
							<DropdownMenuItem>
								<User />
								Профиль
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Settings />
								Настройки
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<LogOut />
								Выход
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	)
}
