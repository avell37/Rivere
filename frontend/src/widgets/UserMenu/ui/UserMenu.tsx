'use client'
import { EllipsisVertical } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
	DropdownMenuTrigger
} from '@/shared/ui/external/Dropdown/Dropdown'
import {
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/shared/ui/external/Sidebar/ui/Sidebar'

import { userMenuFields } from './UserFields'

export const UserMenu = () => {
	const { data: user } = useGetUser()
	const fields = userMenuFields()
	const router = useRouter()

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
							{fields.map(item => (
								<DropdownMenuItem
									key={item.id}
									onClick={() => router.push(item.url)}
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
