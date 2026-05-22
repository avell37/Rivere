import {
	Check,
	ChevronRight,
	MessageCircleMore,
	SquareKanban,
	User,
	UserMinus
} from 'lucide-react'
import Link from 'next/link'

import { ADMIN_URL } from '@/shared/libs'

import { AdminStats } from '../types/AdminProps'
import { formatTrend } from '../utils/formatTrend'

export const mapStatistics = (
	data: AdminStats,
	t: (key: string, values?: { count: string | number }) => string
) => {
	return [
		{
			key: 'users',
			icon: <User className='text-blue-300' />,
			value: data.users.total,
			description: t('admin.statistics.users.description'),
			wrapperIconClassname: 'bg-linear-to-br from-blue-900 to-blue-500',
			valueClassname: 'text-blue-400',
			trend: formatTrend(data.users.today, t),
			bottomContent: (
				<Link
					href={ADMIN_URL.adminUsers(1)}
					className='flex items-end gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition mt-1'
				>
					{t('admin.statistics.users.bottomContent')}{' '}
					<ChevronRight size={14} />
				</Link>
			)
		},
		{
			key: 'boards',
			icon: <SquareKanban className='text-purple-300' />,
			value: data.boards.total,
			description: t('admin.statistics.boards.description'),
			wrapperIconClassname:
				'bg-linear-to-br from-purple-900 to-purple-500',
			valueClassname: 'text-purple-400',
			trend: formatTrend(data.boards.today, t),
			bottomContent: (
				<span className='text-xs text-muted-foreground font-medium hover:text-foreground transition'>
					{t('admin.statistics.boards.bottomContent')}
				</span>
			)
		},
		{
			key: 'messages',
			icon: <MessageCircleMore className='text-green-300' />,
			value: data.messages.total,
			description: t('admin.statistics.messages.description'),
			wrapperIconClassname: 'bg-linear-to-br from-green-900 to-green-500',
			valueClassname: 'text-green-400',
			trend: formatTrend(data.messages.today, t),
			bottomContent: (
				<span className='text-xs text-muted-foreground font-medium hover:text-foreground transition'>
					{t('admin.statistics.messages.bottomContent')}
				</span>
			)
		},
		{
			key: 'completedCards',
			icon: <Check className='text-teal-300' />,
			value: data.completedCards.total,
			description: t('admin.statistics.completedCards.description'),
			wrapperIconClassname: 'bg-linear-to-br from-teal-900 to-teal-500',
			valueClassname: 'text-teal-400',
			trend: formatTrend(data.completedCards.today, t),
			bottomContent: (
				<span className='text-xs text-muted-foreground font-medium hover:text-foreground transition'>
					{t('admin.statistics.completedCards.bottomContent')}
				</span>
			)
		},
		{
			key: 'bannedUsers',
			icon: <UserMinus className='text-fuchsia-300' />,
			value: data.banned.total,
			description: t('admin.statistics.banned.description'),
			wrapperIconClassname:
				'bg-linear-to-br from-fuchsia-900 to-fuchsia-500',
			valueClassname: 'text-fuchsia-400',
			trend: formatTrend(data.banned.today, t),
			bottomContent: (
				<span className='text-xs text-muted-foreground font-medium hover:text-foreground transition'>
					{t('admin.statistics.banned.bottomContent')}
				</span>
			)
		}
	]
}
