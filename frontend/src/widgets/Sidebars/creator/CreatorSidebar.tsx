import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { PUBLIC_URL } from '@/shared/libs/constants/url.config'
import { Sidebar } from '@/shared/ui/custom/Sidebar/Sidebar'
import {
	SidebarMenuButton,
	SidebarMenuItem
} from '@/shared/ui/external/Sidebar/ui/Sidebar'

import { CreatorSidebarFields } from './CreatorSidebarFields'

export const CreatorSidebar = () => {
	const t = useTranslations()
	const creatorSidebarFields = CreatorSidebarFields(t)

	return (
		<Sidebar
			headerContent={
				<Link
					href={PUBLIC_URL.statistics()}
					className='text-3xl pl-2 font-bold max-w-[100px]'
				>
					Rivere
				</Link>
			}
			menuContent={
				<>
					{creatorSidebarFields.map(item => (
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
