import { useLocale, useTranslations } from 'next-intl'

import { formatDate, formatTime } from '@/shared/utils'

import { BoardMembersListProps } from '../model/types/BoardProps'

import { BoardMemberItem } from './BoardMemberItem'

export const BoardMembersList = ({ members }: BoardMembersListProps) => {
	const t = useTranslations('boards.members')
	const locale = useLocale()

	return (
		<section className='flex flex-col gap-4'>
			<h2 className='font-bold text-xl'>{t('title')}</h2>
			<div className='flex flex-col gap-3'>
				{members.map(member => (
					<BoardMemberItem
						key={member.id}
						member={member}
						joinedAtText={t('joinedAt', {
							date: formatDate(member.createdAt, locale),
							time: formatTime(member.createdAt, locale)
						})}
					/>
				))}
			</div>
		</section>
	)
}
