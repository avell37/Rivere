'use client'

import { UserAvatar } from '@/entities/User'

import { EmptyState } from '@/shared/ui/custom'
import { Button, Input, Spinner } from '@/shared/ui/external'

import { useInviteUserBySearch } from '../model/hooks/useInviteQueries'
import { useInviteSearch } from '../model/hooks/useInviteSearch'

export const InviteUserSearch = ({ boardId }: { boardId: string }) => {
	const {
		t,
		query,
		debouncedQuery,
		inviteUserPending,
		setQuery,
		handleSearch,
		handleInvite
	} = useInviteSearch(boardId)
	const { data, isFetching } = useInviteUserBySearch({
		boardId,
		debouncedQuery
	})

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
					<EmptyState centered>{t('empty')}</EmptyState>
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
