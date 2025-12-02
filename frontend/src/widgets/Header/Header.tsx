'use client'
import { ThemeSwitcher } from '@/shared/ui/custom/ThemeSwitcher/ThemeSwitcher'
import { SidebarTrigger, useSidebar } from '@/shared/ui/external'

import { UserMenu } from '../UserMenu/ui/UserMenu'

export const Header = () => {
	const { state } = useSidebar()

	return (
		<div
			className={`fixed top-0 right-0 flex items-center transition-all duration-200
		justify-between bg-gray-200 dark:bg-neutral-800 px-4 ${state === 'expanded' ? 'left-[var(--sidebar-width)]' : 'left-0'}`}
		>
			<SidebarTrigger className='cursor-pointer' />
			<div className='flex items-center gap-2'>
				<ThemeSwitcher />
				<UserMenu />
			</div>
		</div>
	)
}
