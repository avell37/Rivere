'use client'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { useLogoutMutation, useUserStore } from '@/entities/User'

import {
	AppDropdown,
	DropdownActionItem,
	LanguageSwitcher,
	ThemeSwitcher
} from '@/shared/ui/custom'
import {
	Button,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuSeparator
} from '@/shared/ui/external'

import { MenuItem } from '../model/types/UserMenuProps'

import { userMenuFields } from './UserFields'
import { UserMenuSkeleton } from './UserMenuSkeleton'
import { UserMenuTrigger } from './UserMenuTrigger'

export const UserMenu = ({ isMainPage }: { isMainPage?: boolean }) => {
	const user = useUserStore(state => state.user)
	const t = useTranslations()
	const fields = userMenuFields(t)
	const router = useRouter()
	const { logout, logoutPending } = useLogoutMutation()

	const handleMenuClick = (item: MenuItem) => {
		if (item.id === 'logout') {
			logout()
			return
		}
		router.push(item.url)
	}

	if (!user) return <UserMenuSkeleton />

	return (
		<AppDropdown
			trigger={
				<Button variant='ghost' size='none'>
					<UserMenuTrigger user={user} isMainPage={isMainPage} />
				</Button>
			}
			contentClassname='w-36 sm:w-58 z-100'
		>
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
					<DropdownActionItem
						key={item.id}
						disabled={item.id === 'logout' && logoutPending}
						onClick={() => handleMenuClick(item)}
					>
						<item.icon />
						{item.title}
					</DropdownActionItem>
				))}
			</DropdownMenuGroup>
		</AppDropdown>
	)
}
