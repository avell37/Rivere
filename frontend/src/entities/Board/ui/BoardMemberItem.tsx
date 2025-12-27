import { customAvatar } from '@/shared/libs/customAvatar'
import { formattedDate } from '@/shared/libs/formattedDate'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/external'

import { IBoardMember } from '../model/types/IBoardMember'

export const BoardMemberItem = ({ member }: { member: IBoardMember }) => {
	return (
		<div className='flex gap-4'>
			<Avatar className='rounded-full'>
				<AvatarImage src={member?.user?.avatar} />
				<AvatarFallback>
					{customAvatar(member?.user?.nickname)}
				</AvatarFallback>
			</Avatar>
			<div>
				<div>{member?.user?.nickname}</div>
				<div>Присоединился: {formattedDate(member?.createdAt)}</div>
			</div>
		</div>
	)
}
