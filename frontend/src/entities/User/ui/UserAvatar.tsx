import { SERVER_URL } from '@/shared/libs/constants/api.config'
import { customAvatar } from '@/shared/libs/customAvatar'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/external'

interface UserAvatarProps {
	avatarClassname?: string
	avatar?: string
	username?: string
}

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
