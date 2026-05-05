import { UserAvatar } from '@/entities/User'

import { formatTime } from '@/shared/utils'

import { ChatUserMessageProps } from '../model/types/IChat'

export const ChatUserMessage = ({ message, locale }: ChatUserMessageProps) => {
	return (
		<div className='flex gap-3'>
			<UserAvatar
				avatar={message.user.avatar ?? undefined}
				username={message.user.nickname}
				avatarClassname='size-8 rounded-full'
			/>

			<div className='flex flex-col gap-1'>
				<div className='flex items-center gap-2'>
					<span className='text-sm font-medium'>
						{message.user.nickname}
					</span>
					<span className='text-xs text-zinc-500'>
						{formatTime(message.createdAt, locale)}
					</span>
				</div>

				<p className='text-sm text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap'>
					{message.text}
				</p>
			</div>
		</div>
	)
}
