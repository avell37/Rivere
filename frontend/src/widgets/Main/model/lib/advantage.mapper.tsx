import {
	BarChart,
	LayoutDashboard,
	MessageCircleMore,
	Shield,
	Users
} from 'lucide-react'

export const advantageCards = (
	t: (key: string, values?: { count: string | number }) => string
) => {
	return [
		{
			key: 'board',
			icon: (
				<LayoutDashboard className='text-blue-600 dark:text-blue-300' />
			),
			title: t('secondSection.firstCard.title'),
			description: t('secondSection.firstCard.description'),
			wrapperIconClassname:
				'border-blue-200 bg-blue-50 dark:border-blue-500/50 dark:bg-blue-400/30',
			wrapperClassname: 'border-blue-500/30 text-blue-300/10'
		},
		{
			key: 'users',
			icon: <Users className='text-teal-600 dark:text-teal-300' />,
			title: t('secondSection.secondCard.title'),
			description: t('secondSection.secondCard.description'),
			wrapperIconClassname:
				'border-teal-200 bg-teal-50 dark:border-teal-500/50 dark:bg-teal-400/30',
			wrapperClassname: 'border-teal-500/30 text-teal-300/10'
		},
		{
			key: 'stats',
			icon: <BarChart className='text-green-600 dark:text-green-300' />,
			title: t('secondSection.thirdCard.title'),
			description: t('secondSection.thirdCard.description'),
			wrapperIconClassname:
				'border-green-200 bg-green-50 dark:border-green-500/50 dark:bg-green-400/30',
			wrapperClassname: 'border-green-500/30 text-green-300/10'
		},
		{
			key: 'chat',
			icon: (
				<MessageCircleMore className='text-purple-600 dark:text-purple-300' />
			),
			title: t('secondSection.fourthCard.title'),
			description: t('secondSection.fourthCard.description'),
			wrapperIconClassname:
				'border-purple-200 bg-purple-50 dark:border-purple-500/50 dark:bg-purple-400/30',
			wrapperClassname: 'border-purple-500/30 text-purple-300/10'
		},
		{
			key: 'security',
			icon: <Shield className='text-orange-600 dark:text-orange-300' />,
			title: t('secondSection.fifthCard.title'),
			description: t('secondSection.fifthCard.description'),
			wrapperIconClassname:
				'border-orange-200 bg-orange-50 dark:border-orange-500/50 dark:bg-orange-400/30',
			wrapperClassname: 'border-orange-500/30 text-orange-300/10'
		}
	]
}
