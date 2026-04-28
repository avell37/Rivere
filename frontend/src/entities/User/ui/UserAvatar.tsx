'use client'

import { customAvatar } from '@/shared/config'
import { S3_URL } from '@/shared/libs'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/external'

import { UserAvatarProps } from '../model/types/UserProps'

export const UserAvatar = ({
	avatarClassname,
	avatar,
	username
}: UserAvatarProps) => {
	return (
		<Avatar
			className={`${avatarClassname ? avatarClassname : 'h-8 w-8 rounded-full'}`}
		>
			{avatar ? (
				<AvatarImage
					src={`${S3_URL}${avatar}`}
					alt={username}
					draggable={false}
				/>
			) : (
				<AvatarFallback>{customAvatar(username || '')}</AvatarFallback>
			)}
		</Avatar>
	)
}
