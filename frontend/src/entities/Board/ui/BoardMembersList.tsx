'use client'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useLocale, useTranslations } from 'next-intl'

import { useUserStore } from '@/entities/User'

import { formatDate, formatTime } from '@/shared/utils'

import { useDeleteMember } from '../model/hooks/useBoardQueries'
import { BoardMembersListProps } from '../model/types/BoardProps'
import { canRemoveMember } from '../model/utils/canRemoveMember'

import { BoardMemberItem } from './BoardMemberItem'

export const BoardMembersList = ({
	members,
	boardId
}: BoardMembersListProps) => {
	const t = useTranslations('boards.members')
	const locale = useLocale()
	const { mutate: removeMember, isPending } = useDeleteMember(boardId)
	const { user } = useUserStore()

	return (
		<section className='flex flex-col gap-4'>
			<h2 className='font-bold text-xl'>{t('title')}</h2>
			<ScrollArea.Root className='relative px-1'>
				<ScrollArea.Viewport className='flex flex-col gap-2 max-h-150 h-full overflow-y-auto'>
					<div className='flex flex-col gap-3'>
						{members.map(member => {
							const currentUserRole = members.find(
								member => member.userId === user?.id
							)?.role
							const canRemove = currentUserRole
								? canRemoveMember(currentUserRole, member.role)
								: false

							return (
								<BoardMemberItem
									key={member.id}
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
									canRemove={canRemove}
									isLoading={isPending}
									onRemove={() => removeMember(member.userId)}
									t={t}
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
