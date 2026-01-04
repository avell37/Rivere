'use client'

import { useTranslations } from 'next-intl'

import { useUserStore } from '@/entities/User/model/store/useUserStore'

import { Sessions } from '@/features/sessions/ui/Sessions'

import { SERVER_URL } from '@/shared/libs/constants/api.config'
import { customAvatar } from '@/shared/libs/customAvatar'
import { Modal } from '@/shared/ui/custom'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Input,
	Label,
	Separator
} from '@/shared/ui/external'

import { useUploadAvatar } from '../model/hooks/useUploadAvatar'

import { ChangeEmailForm } from './forms/ChangeEmailForm'
import { ChangeNicknameForm } from './forms/ChangeNicknameForm'
import { ChangePasswordForm } from './forms/ChangePasswordForm'
import { ChangeUsernameForm } from './forms/ChangeUsernameForm'

export const UserSettings = () => {
	const {
		fileInputRef,
		isPending,
		handleChangeAvatarClick,
		handleFileChange
	} = useUploadAvatar()
	const user = useUserStore(state => state.user)
	const t = useTranslations('profile.settings')

	return (
		<div className='flex flex-col items-center justify-center px-6 py-4 gap-8'>
			<h1 className='font-bold text-2xl'>{t('title')}</h1>
			<div className='flex flex-col gap-6 w-full'>
				<div className='flex flex-col justify-center items-center gap-4'>
					<Avatar className='w-64 h-64 rounded-full -z-1'>
						{user?.avatar ? (
							<AvatarImage src={`${SERVER_URL}${user?.avatar}`} />
						) : (
							<AvatarFallback>
								{customAvatar(user?.username || 'User')}
							</AvatarFallback>
						)}
					</Avatar>
					<Input
						type='file'
						accept='image/*'
						ref={fileInputRef}
						className='hidden'
						onChange={handleFileChange}
					/>
					<Button
						onClick={handleChangeAvatarClick}
						disabled={isPending}
					>
						{t('avatar.avatarChangeButton')}
					</Button>
				</div>
				<h3 className='text-2xl font-bold'>
					{t('personalInformation.heading')}
				</h3>
				<Separator />
				<div className='grid grid-cols-2 gap-6'>
					<div className='flex items-end gap-2 w-full'>
						<div className='flex flex-col gap-2 w-full'>
							<Label>
								{t('personalInformation.usernameLabel')}
							</Label>
							<Input
								className='w-full'
								disabled
								value={user?.username || ''}
							/>
						</div>
						<Modal
							trigger={
								<Button>
									{t('personalInformation.usernameButton')}
								</Button>
							}
							contentClassname='max-w-md'
						>
							<ChangeUsernameForm t={t} />
						</Modal>
					</div>
					<div className='flex items-end gap-2 w-full'>
						<div className='flex flex-col gap-2 w-full'>
							<Label>
								{t('personalInformation.nicknameLabel')}
							</Label>
							<Input
								className='w-full'
								disabled
								value={user?.nickname || ''}
							/>
						</div>
						<Modal
							trigger={
								<Button>
									{t('personalInformation.nicknameButton')}
								</Button>
							}
							contentClassname='max-w-md'
						>
							<ChangeNicknameForm t={t} />
						</Modal>
					</div>
				</div>
			</div>
			<div className='flex flex-col gap-6 w-full'>
				<h3 className='text-2xl font-bold'>{t('security.heading')}</h3>
				<Separator />
				<div className='flex gap-6'>
					<div className='flex items-end gap-2 w-full'>
						<div className='flex flex-col gap-2 w-full'>
							<Label>{t('security.emailLabel')}</Label>
							<Input
								className='w-full'
								disabled
								value={user?.email || ''}
							/>
						</div>
						<Modal
							trigger={
								<Button>{t('security.emailButton')}</Button>
							}
							contentClassname='max-w-md'
						>
							<ChangeEmailForm t={t} />
						</Modal>
					</div>
					<div className='flex items-end gap-2 w-full'>
						<div className='flex flex-col gap-2 w-full'>
							<Label>{t('security.passwordLabel')}</Label>
							<p className='text-sm text-muted-foreground'>
								{t('security.passwordDescription')}
							</p>
						</div>

						<Modal
							trigger={
								<Button>{t('security.passwordButton')}</Button>
							}
							contentClassname='max-w-md'
						>
							<ChangePasswordForm t={t} />
						</Modal>
					</div>
				</div>
			</div>
			<Sessions />
		</div>
	)
}
