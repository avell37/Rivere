'use client'

import { useTranslations } from 'next-intl'

import { IUser, useUserStore } from '@/entities/User'

import { Sessions } from '@/features/sessions'
import { DeleteAccountForm } from '@/features/settings'

import { Button } from '@/shared/ui/external'

import { useSettingsScrollSpy } from '../model/hooks/useSettingsScrollSpy'
import { getSettingsSidebarItems } from '../model/lib/settingsSidebar'

import { UserSettingsConnections } from './UserSettingsConnections'
import {
	UserSettingsProfile,
	useUserSettingsAvatarProps
} from './UserSettingsProfile'
import { UserSettingsSecurity } from './UserSettingsSecurity'
import { UserSettingsSkeleton } from './UserSettingsSkeleton'

export const UserSettings = () => {
	const user = useUserStore(state => state.user)

	if (!user) return <UserSettingsSkeleton />

	return <UserSettingsContent user={user} />
}

const UserSettingsContent = ({ user }: { user: IUser }) => {
	const t = useTranslations('profile.settings')
	const avatarProps = useUserSettingsAvatarProps(user)
	const sidebarItems = getSettingsSidebarItems(t)
	const { activeSection, scrollToSection } = useSettingsScrollSpy()

	return (
		<div className='container mx-auto flex flex-col md:flex-row items-stretch py-4 gap-6 md:gap-8 px-4'>
			<aside className='md:w-56 shrink-0 md:sticky md:top-6 md:self-start overflow-x-auto max-lg:hidden'>
				<nav className='flex md:flex-col gap-1 min-w-max md:min-w-0'>
					{sidebarItems.map(item => (
						<Button
							key={item.value}
							type='button'
							onClick={() => scrollToSection(item.value)}
							variant='none'
							size='none'
							className={`justify-start gap-3 rounded-md px-3 py-2.5 text-left transition 
								whitespace-nowrap w-full
								${
									activeSection === item.value
										? 'bg-muted font-medium text-foreground'
										: 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
								}`}
						>
							{item.icon}
							{item.label}
						</Button>
					))}
				</nav>
			</aside>

			<div className='flex flex-col gap-6 md:gap-8 w-full min-w-0'>
				<section id='profile' className='scroll-mt-6'>
					<UserSettingsProfile
						t={t}
						user={user}
						avatarProps={avatarProps}
					/>
				</section>

				<section id='security' className='scroll-mt-6'>
					<div className='flex flex-col gap-4'>
						<h3 className='text-2xl font-bold'>
							{t('security.heading')}
						</h3>
						<div className='flex flex-col gap-4'>
							<UserSettingsSecurity t={t} user={user} />
							<Sessions />
						</div>
					</div>
				</section>

				<section id='connections' className='scroll-mt-6'>
					<UserSettingsConnections t={t} user={user} />
				</section>

				<section id='danger' className='scroll-mt-6'>
					<div className='flex flex-col gap-4'>
						<h3 className='text-2xl font-bold text-destructive'>
							{t('dangerZone.heading')}
						</h3>
						<div className='rounded-lg border border-destructive/30 bg-card p-6'>
							<p className='mb-4 text-sm text-muted-foreground'>
								{t('dangerZone.summary')}
							</p>
							<DeleteAccountForm />
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}
