'use client'

import { Contact, User } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { useUserStore } from '@/entities/User'

import { Sessions } from '@/features/sessions'
import {
	ChangeNicknameForm,
	ChangeUsernameForm,
	useUploadAvatar
} from '@/features/settings'

import { Modal } from '@/shared/ui/custom'
import { Button, Label } from '@/shared/ui/external'

import { UserSettingsAvatar } from './UserSettingsAvatar'
import { UserSettingsSecurity } from './UserSettingsSecurity'
import { UserSettingsSkeleton } from './UserSettingsSkeleton'

export const UserSettings = () => {
	const {
		fileInputRef,
		uploadAvatarPending,
		handleChangeAvatarClick,
		handleFileChange
	} = useUploadAvatar()
	const user = useUserStore(state => state.user)
	const t = useTranslations('profile.settings')

	if (!user) return <UserSettingsSkeleton />

	return (
		<div className='container mx-auto flex flex-col iitems-stretch md:items-center py-4 gap-6 md:gap-8 px-4'>
			<div className='flex flex-col gap-6 w-full'>
				<div className='flex flex-col gap-6'>
					<h3 className='text-2xl font-bold'>
						{t('personalInformation.heading')}
					</h3>
					<div className='flex flex-col gap-6 bg-sidebar p-8 px-6 rounded-lg border'>
						<UserSettingsAvatar
							user={user}
							fileInputRef={fileInputRef}
							isPending={uploadAvatarPending}
							handleFileChange={handleFileChange}
							handleChangeAvatarClick={handleChangeAvatarClick}
						/>
						<div className='flex flex-col md:flex-row gap-4'>
							<div
								className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full 
							rounded-lg p-3 bg-background hover:bg-black/10 transition-all'
							>
								<div className='flex gap-3 sm:gap-4 w-full'>
									<div className='bg-linear-to-br from-cyan-300 to-cyan-700 p-2 rounded-lg'>
										<User
											size={28}
											className='text-white'
										/>
									</div>
									<div>
										<Label className='text-sm text-black/90 dark:text-gray-300'>
											{t(
												'personalInformation.usernameLabel'
											)}
										</Label>
										<span className='text-sm'>
											{user?.username}
										</span>
									</div>
								</div>
								<Modal
									trigger={
										<Button
											variant='outline'
											className='w-full sm:w-auto cursor-pointer'
										>
											{t(
												'personalInformation.usernameButton'
											)}
										</Button>
									}
									contentClassname='max-w-md'
									title={t(
										'personalInformation.usernameTitle'
									)}
									description={t(
										'personalInformation.usernameDescription'
									)}
								>
									<ChangeUsernameForm t={t} />
								</Modal>
							</div>
							<div
								className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full rounded-lg 
							p-3 bg-background hover:bg-black/10 transition-all'
							>
								<div className='flex gap-3 sm:gap-4 w-full'>
									<div className='bg-linear-to-br from-cyan-300 to-cyan-700 p-2 rounded-lg'>
										<Contact
											size={28}
											className='text-white'
										/>
									</div>
									<div>
										<Label className='text-sm text-black/90 dark:text-gray-300'>
											{t(
												'personalInformation.nicknameLabel'
											)}
										</Label>
										<span className='text-sm'>
											{user?.nickname}
										</span>
									</div>
								</div>
								<Modal
									trigger={
										<Button
											variant='outline'
											className='w-full sm:w-auto cursor-pointer'
										>
											{t(
												'personalInformation.nicknameButton'
											)}
										</Button>
									}
									contentClassname='max-w-md'
									title={t(
										'personalInformation.nicknameTitle'
									)}
									description={t(
										'personalInformation.nicknameDescription'
									)}
								>
									<ChangeNicknameForm t={t} />
								</Modal>
							</div>
						</div>
					</div>
				</div>
				<div className='flex flex-col gap-4'>
					<h3 className='text-2xl font-bold'>
						{t('security.heading')}
					</h3>
					<div className='flex flex-col gap-4'>
						<UserSettingsSecurity t={t} user={user} />
						<Sessions />
					</div>
				</div>
			</div>
		</div>
	)
}
