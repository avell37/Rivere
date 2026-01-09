import {
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	Skeleton
} from '@/shared/ui/external'

export const UserMenuSkeleton = () => {
	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<SidebarMenuButton size='lg'>
						<Skeleton className='h-8 w-8 rounded-full' />

						<div className='flex flex-col gap-1 ml-2'>
							<Skeleton className='h-4 w-24' />
							<Skeleton className='h-3 w-32' />
						</div>

						<Skeleton className='h-5 w-5 ml-auto rounded' />
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	)
}
