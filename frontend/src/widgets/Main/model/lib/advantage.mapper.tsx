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
			icon: <LayoutDashboard className='text-blue-300' />,
			title: t('secondSection.firstCard.title'),
			description: t('secondSection.firstCard.description'),
			wrapperIconClassname: 'border-blue-500/50 bg-blue-400/30',
			wrapperClassname: 'border-blue-500/30 text-blue-300/10'
		},
		{
			key: 'users',
			icon: <Users className='text-teal-300' />,
			title: t('secondSection.secondCard.title'),
			description: t('secondSection.secondCard.description'),
			wrapperIconClassname: 'border-teal-500/50 bg-teal-400/30',
			wrapperClassname: 'border-teal-500/30 text-teal-300/10'
		},
		{
			key: 'stats',
			icon: <BarChart className='text-green-300' />,
			title: t('secondSection.thirdCard.title'),
			description: t('secondSection.thirdCard.description'),
			wrapperIconClassname: 'border-green-500/50 bg-green-400/30',
			wrapperClassname: 'border-green-500/30 text-green-300/10'
		},
		{
			key: 'chat',
			icon: <MessageCircleMore className='text-purple-300' />,
			title: t('secondSection.fourthCard.title'),
			description: t('secondSection.fourthCard.description'),
			wrapperIconClassname: 'border-purple-500/50 bg-purple-400/30',
			wrapperClassname: 'border-purple-500/30 text-purple-300/10'
		},
		{
			key: 'security',
			icon: <Shield className='text-orange-300' />,
			title: t('secondSection.fifthCard.title'),
			description: t('secondSection.fifthCard.description'),
			wrapperIconClassname: 'border-orange-500/50 bg-orange-400/30',
			wrapperClassname: 'border-orange-500/30 text-orange-300/10'
		}
	]
}
