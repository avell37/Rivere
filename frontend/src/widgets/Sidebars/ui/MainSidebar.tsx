import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { PUBLIC_URL } from '@/shared/libs'
import { Sidebar } from '@/shared/ui/custom'
import { SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/external'

import { MainSidebarFields } from './MainSidebarFields'

export const MainSidebar = () => {
	const t = useTranslations()
	const mainSidebarFields = MainSidebarFields(t)

	return (
		<Sidebar
			headerContent={
				<Link
					href={PUBLIC_URL.boards()}
					className='text-3xl pl-2 font-bold max-w-[100px]'
				>
					Rivere
				</Link>
			}
			menuContent={
				<>
					{mainSidebarFields.map(item => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild>
								<Link href={item.url} className='py-6 pr-6'>
									<item.icon />
									<span className='text-base'>
										{item.title}
									</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</>
			}
		/>
	)
}
