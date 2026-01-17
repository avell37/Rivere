import { UserAvatar } from '@/entities/User'

import { Badge } from '@/shared/ui/external'

import { BoardMemberItemProps } from '../model/types/BoardProps'

export const BoardMemberItem = ({
	member,
	joinedAtText
}: BoardMemberItemProps) => {
	return (
		<div className='flex items-center gap-4 rounded-lg bg-muted p-4 shadow-sm'>
			<UserAvatar
				avatar={member?.user?.avatar}
				username={member?.user?.nickname}
			/>
			<div className='flex flex-col gap-1'>
				<div className='flex gap-2'>
					<div className='font-medium'>{member?.user?.nickname}</div>
					<Badge variant='outline'>{member.role.toLowerCase()}</Badge>
				</div>
				<span className='text-sm text-muted-foreground'>
					{joinedAtText}
				</span>
			</div>
		</div>
	)
}
