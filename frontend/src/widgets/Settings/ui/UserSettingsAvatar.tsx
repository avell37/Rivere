'use client'
import { useTranslations } from 'next-intl'

import { IUser, UserAvatar } from '@/entities/User'

import { customAvatar } from '@/shared/config'
import { SERVER_URL } from '@/shared/libs'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Input
} from '@/shared/ui/external'

interface UserSettingsAvatarProps {
	user: IUser
	fileInputRef: React.RefObject<HTMLInputElement | null>
	isPending: boolean
	handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleChangeAvatarClick: () => void
}

export const UserSettingsAvatar = ({
	user,
	fileInputRef,
	handleFileChange,
	handleChangeAvatarClick
}: UserSettingsAvatarProps) => {
	const t = useTranslations('profile.settings.avatar')

	return (
		<div className='flex flex-col justify-center items-center gap-4'>
			<Avatar
				className='relative w-64 h-64 rounded-full group cursor-pointer hover:opacity-80 transition-all'
				onClick={handleChangeAvatarClick}
			>
				{user.avatar ? (
					<AvatarImage
						src={`${SERVER_URL}${user.avatar}`}
						alt={user.username}
						draggable={false}
						style={{ pointerEvents: 'none' }}
					/>
				) : (
					<AvatarFallback>
						{customAvatar(user.username || '')}
					</AvatarFallback>
				)}
				<div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none'>
					<span className='text-sm text-white'>
						{t('avatarChangeButton')}
					</span>
				</div>
			</Avatar>
			<Input
				type='file'
				accept='image/*'
				ref={fileInputRef}
				className='hidden'
				onChange={handleFileChange}
			/>
		</div>
	)
}
