import { X } from 'lucide-react'

import { UserAvatar } from '@/entities/User'

import { Badge, Button } from '@/shared/ui/external'

import { BoardMemberItemProps } from '../model/types/BoardProps'

export const BoardMemberItem = ({
	member,
	joinedAtText,
	canRemove,
	isLoading,
	onRemove
}: BoardMemberItemProps) => {
	return (
		<div className='relative flex items-center gap-4 rounded-lg bg-muted p-4 shadow-sm'>
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

			{canRemove && (
				<Button
					variant='none'
					size='none'
					className='absolute top-2 right-2'
					disabled={isLoading}
					onClick={onRemove}
				>
					<X className='text-red-500' />
				</Button>
			)}
		</div>
	)
}
