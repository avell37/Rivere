'use client'
import { NotificationsDropdown } from '@/features/notifications/ui/NotificationsDropdown'

import { LanguageSwitcher } from '@/shared/ui/custom/LanguageSwitcher/LanguageSwitcher'
import { ThemeSwitcher } from '@/shared/ui/custom/ThemeSwitcher/ThemeSwitcher'
import { SidebarTrigger, useSidebar } from '@/shared/ui/external'

import { UserMenu } from '../UserMenu/ui/UserMenu'

export const Header = () => {
	const { state } = useSidebar()

	return (
		<div
			className={`fixed top-0 right-0 flex items-center transition-all duration-200
		justify-between bg-background border-b px-4 ${state === 'expanded' ? 'left-(--sidebar-width)' : 'left-0'}`}
		>
			<SidebarTrigger className='cursor-pointer' />
			<div className='flex items-center gap-2'>
				<NotificationsDropdown />
				<LanguageSwitcher />
				<ThemeSwitcher />
				<UserMenu />
			</div>
		</div>
	)
}
