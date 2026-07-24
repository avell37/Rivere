'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'

import { UserAvatar } from '@/entities/User'

import { Button, Input, Spinner } from '@/shared/ui/external'

import {
	useInviteUser,
	useInviteUserBySearch
} from '../model/hooks/useInviteQueries'
import { InviteSearchUser } from '../model/types/InviteProps'

export const InviteUserSearch = ({ boardId }: { boardId: string }) => {
	const t = useTranslations('invite.user')
	const [query, setQuery] = useState('')
	const [debouncedQuery, setDebouncedQuery] = useState('')
	const { inviteUserToBoard, inviteUserPending } = useInviteUser()
	const { data, isFetching } = useInviteUserBySearch({
		boardId,
		debouncedQuery
	})

	const handleSearch = () => {
		setDebouncedQuery(query.trim())
	}

	const handleInvite = async (user: InviteSearchUser) => {
		await inviteUserToBoard(
			{ boardId, userId: user.id },
			{
				onSuccess: () => {
					toast.success(t('invited', { name: user.nickname }))
				}
			}
		)
	}

	const users = data?.users ?? []

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex gap-2'>
				<Input
					value={query}
					onChange={event => setQuery(event.target.value)}
					placeholder={t('searchPlaceholder')}
					onKeyDown={event => {
						if (event.key === 'Enter') {
							event.preventDefault()
							handleSearch()
						}
					}}
				/>
				<Button
					variant='outline'
					onClick={handleSearch}
					disabled={query.trim().length < 2 || isFetching}
				>
					{t('searchButton')}
				</Button>
			</div>

			{isFetching && (
				<div className='flex justify-center py-4'>
					<Spinner />
				</div>
			)}

			{debouncedQuery.length >= 2 &&
				!isFetching &&
				users.length === 0 && (
					<p className='text-sm text-muted-foreground'>
						{t('empty')}
					</p>
				)}

			<div className='flex flex-col gap-2'>
				{users.map(user => (
					<div
						key={user.id}
						className='flex items-center justify-between gap-3 rounded-lg border p-3'
					>
						<div className='flex items-center gap-3 min-w-0'>
							<UserAvatar
								avatar={user.avatar ?? undefined}
								username={user.nickname}
								avatarClassname='size-9 rounded-full'
							/>
							<div className='min-w-0'>
								<p className='truncate text-sm font-medium'>
									{user.nickname}
								</p>
								<p className='truncate text-xs text-muted-foreground'>
									@{user.username}
								</p>
							</div>
						</div>
						<Button
							size='sm'
							onClick={() => handleInvite(user)}
							disabled={inviteUserPending}
						>
							{t('inviteButton')}
						</Button>
					</div>
				))}
			</div>
		</div>
	)
}
