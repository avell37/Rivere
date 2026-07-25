'use client'

import { Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { UserAvatar } from '@/entities/User'

import { ReportMessageButton } from '@/features/reports'

import { Alert } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'
import { formatTime } from '@/shared/utils'

import { ChatUserMessageProps } from '../model/types/IChat'

export const ChatUserMessage = ({
	message,
	locale,
	currentUserId,
	onDelete
}: ChatUserMessageProps) => {
	const t = useTranslations('card.chat')
	const [deleteOpen, setDeleteOpen] = useState(false)

	const isDeleted = Boolean(message.deletedAt)
	const isOwnMessage = message.userId === currentUserId

	const handleDeleteConfirm = () => {
		onDelete?.(message.id)
		setDeleteOpen(false)
	}

	return (
		<div className='group flex min-w-0 gap-3'>
			<UserAvatar
				avatar={message.user.avatar ?? undefined}
				username={message.user.nickname}
				avatarClassname='size-8 shrink-0 rounded-full'
			/>

			<div className='min-w-0 flex-1 flex flex-col gap-1 overflow-hidden'>
				<div className='flex min-w-0 items-center gap-2'>
					<span className='truncate text-sm font-medium'>
						{message.user.nickname}
					</span>

					<span className='shrink-0 text-xs text-zinc-500'>
						{formatTime(message.createdAt, locale)}
					</span>

					{!isDeleted && (
						<div className='ml-auto flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100'>
							{isOwnMessage ? (
								<>
									<Button
										type='button'
										variant='none'
										size='none'
										className='text-muted-foreground transition-colors hover:text-destructive'
										title={t('deleteMessage')}
										onClick={() => setDeleteOpen(true)}
									>
										<Trash2 className='size-3.5' />
									</Button>
									<Alert
										open={deleteOpen}
										onOpenChange={setDeleteOpen}
										title={t('deleteConfirmTitle')}
										description={t(
											'deleteConfirmDescription'
										)}
										actionText={t('deleteConfirmAction')}
										cancelText={t('deleteCancel')}
										onSubmit={handleDeleteConfirm}
									/>
								</>
							) : (
								<ReportMessageButton
									message={message}
									currentUserId={currentUserId}
								/>
							)}
						</div>
					)}
				</div>

				<p
					className={`min-w-0 max-w-full text-sm break-all whitespace-pre-wrap ${
						isDeleted
							? 'italic text-muted-foreground'
							: 'text-zinc-800 dark:text-zinc-200'
					}`}
				>
					{isDeleted ? t('deletedMessage') : message.text}
				</p>
			</div>
		</div>
	)
}
