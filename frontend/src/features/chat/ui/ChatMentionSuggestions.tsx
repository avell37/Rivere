'use client'

import { MentionMember } from '@/entities/Chat'
import { UserAvatar } from '@/entities/User'

export const ChatMentionSuggestions = ({
	members,
	onSelect
}: {
	members: MentionMember[]
	onSelect: (username: string) => void
}) => {
	if (members.length === 0) return null

	return (
		<div className='absolute bottom-full left-0 z-50 mb-2 max-h-40 w-full overflow-y-auto rounded-lg border bg-popover p-1 shadow-md'>
			{members.map(member => (
				<button
					key={member.userId}
					type='button'
					className='flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent'
					onMouseDown={event => {
						event.preventDefault()
						onSelect(member.user.username)
					}}
				>
					<UserAvatar
						avatar={member.user.avatar ?? undefined}
						username={member.user.nickname}
						avatarClassname='size-6 rounded-full'
					/>
					<div className='min-w-0'>
						<p className='truncate font-medium'>
							{member.user.nickname}
						</p>
						<p className='truncate text-xs text-muted-foreground'>
							@{member.user.username}
						</p>
					</div>
				</button>
			))}
		</div>
	)
}
