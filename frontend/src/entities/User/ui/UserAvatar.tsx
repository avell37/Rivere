import { customAvatar } from '@/shared/config'
import { SERVER_URL } from '@/shared/libs'
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
				<AvatarImage src={`${SERVER_URL}${avatar}`} />
			) : (
				<AvatarFallback>{customAvatar(username || '')}</AvatarFallback>
			)}
		</Avatar>
	)
}
