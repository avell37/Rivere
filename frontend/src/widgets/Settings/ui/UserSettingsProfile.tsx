'use client'

import { Contact, User } from 'lucide-react'

import { IUser } from '@/entities/User'

import {
	ChangeNicknameForm,
	ChangeUsernameForm,
	useUploadAvatar
} from '@/features/settings'

import { Modal } from '@/shared/ui/custom'
import { Button, Label } from '@/shared/ui/external'

import { UserSettingsAvatarProps } from '../model/types/SettingsProps'
import { UserSettingsAvatar } from './UserSettingsAvatar'

interface UserSettingsProfileProps {
	t: (key: string) => string
	user: IUser
	avatarProps: UserSettingsAvatarProps
}

export const UserSettingsProfile = ({
	t,
	user,
	avatarProps
}: UserSettingsProfileProps) => {
	return (
		<div className='flex flex-col gap-6'>
			<h3 className='text-2xl font-bold'>
				{t('personalInformation.heading')}
			</h3>
			<div className='flex flex-col gap-6 bg-sidebar p-8 px-6 rounded-lg border'>
				<UserSettingsAvatar {...avatarProps} />
				<div className='flex flex-col md:flex-row gap-4'>
					<div
						className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full 
						rounded-lg p-3 bg-card border border-border hover:bg-accent/60 transition-all'
					>
						<div className='flex gap-3 sm:gap-4 w-full'>
							<div className='bg-linear-to-br from-cyan-300 to-cyan-700 p-2 rounded-lg'>
								<User size={28} className='text-white' />
							</div>
							<div>
								<Label className='text-sm text-muted-foreground'>
									{t('personalInformation.usernameLabel')}
								</Label>
								<span className='text-sm'>{user.username}</span>
							</div>
						</div>
						<Modal
							trigger={
								<Button
									variant='outline'
									className='w-full sm:w-auto cursor-pointer'
								>
									{t('personalInformation.usernameButton')}
								</Button>
							}
							contentClassname='max-w-md'
							title={t('personalInformation.usernameTitle')}
							description={t(
								'personalInformation.usernameDescription'
							)}
						>
							<ChangeUsernameForm t={t} />
						</Modal>
					</div>
					<div
						className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full rounded-lg 
						p-3 bg-card border border-border hover:bg-accent/60 transition-all'
					>
						<div className='flex gap-3 sm:gap-4 w-full'>
							<div className='bg-linear-to-br from-cyan-300 to-cyan-700 p-2 rounded-lg'>
								<Contact size={28} className='text-white' />
							</div>
							<div>
								<Label className='text-sm text-muted-foreground'>
									{t('personalInformation.nicknameLabel')}
								</Label>
								<span className='text-sm'>{user.nickname}</span>
							</div>
						</div>
						<Modal
							trigger={
								<Button
									variant='outline'
									className='w-full sm:w-auto cursor-pointer'
								>
									{t('personalInformation.nicknameButton')}
								</Button>
							}
							contentClassname='max-w-md'
							title={t('personalInformation.nicknameTitle')}
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
	)
}

export const useUserSettingsAvatarProps = (
	user: IUser
): UserSettingsAvatarProps => {
	const {
		fileInputRef,
		uploadAvatarPending,
		handleChangeAvatarClick,
		handleFileChange
	} = useUploadAvatar()

	return {
		user,
		fileInputRef,
		isPending: uploadAvatarPending,
		handleFileChange,
		handleChangeAvatarClick
	}
}
