'use client'
import * as ScrollArea from '@radix-ui/react-scroll-area'

import { Spinner } from '@/shared/ui/external'
import { formatDate, formatTime } from '@/shared/utils'

import { useBoardMembers } from '../model/hooks/useBoardMembers'
import { BoardMembersListProps } from '../model/types/BoardProps'
import { canManageMember } from '../model/utils/member-permissions'

import { BoardMemberItem } from './BoardMemberItem'

export const BoardMembersList = ({
	members,
	membersPending,
	boardId
}: BoardMembersListProps) => {
	const {
		user,
		pendingUserId,
		deleteMemberId,
		removeMemberPending,
		currentUserRole,
		canDeleteMember,
		canManageRoles,
		locale,
		t,
		removeMember,
		handleChangeRole,
		setDeleteMemberId
	} = useBoardMembers({ members, boardId })

	if (membersPending) {
		return <Spinner />
	}

	return (
		<section className='flex flex-col gap-4'>
			<h2 className='font-bold text-xl'>{t('title')}</h2>
			<ScrollArea.Root className='relative px-1'>
				<ScrollArea.Viewport className='flex flex-col gap-2 max-h-150 h-full overflow-y-auto'>
					<div className='flex flex-col gap-3'>
						{members.map(member => {
							const memberAccess = canManageMember({
								currentUserId: user?.id,
								currentUserRole,
								targetUserId: member.userId,
								targetRole: member.role
							})

							return (
								<BoardMemberItem
									key={member.id}
									isDeleteOpen={
										deleteMemberId === member.userId
									}
									member={member}
									joinedAtText={t('joinedAt', {
										date: formatDate(
											member.createdAt,
											locale
										),
										time: formatTime(
											member.createdAt,
											locale
										)
									})}
									changeRolePending={
										pendingUserId === member.userId
									}
									isLoading={removeMemberPending}
									canRemove={canDeleteMember && memberAccess}
									canManageRoles={
										canManageRoles && memberAccess
									}
									onRemove={() =>
										removeMember({ userId: member.userId })
									}
									t={t}
									changeRole={handleChangeRole(member.userId)}
									setIsDeleteOpen={open =>
										setDeleteMemberId(
											open ? member.userId : null
										)
									}
								/>
							)
						})}
					</div>
				</ScrollArea.Viewport>
				<ScrollArea.Scrollbar
					orientation='vertical'
					className='absolute right-20 top-0 bottom-0 w-2 translate-x-full'
				>
					<ScrollArea.Thumb className='block w-full bg-white/60 rounded-full' />
				</ScrollArea.Scrollbar>
			</ScrollArea.Root>
		</section>
	)
}
