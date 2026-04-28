import { Award, Shield, SquareKanban, SquareMenu } from 'lucide-react'

import { PRIVATE_URL, PUBLIC_URL } from '@/shared/libs'

export const HeaderNavFields = ({
	role,
	t
}: {
	role: string | undefined
	t: (key: string) => string
}) => {
	const baseFields = [
		{
			title: t('boards.heading'),
			url: PUBLIC_URL.boards(),
			icon: SquareKanban
		},
		{
			title: t('statistics.heading'),
			url: PUBLIC_URL.statistics(),
			icon: SquareMenu
		},
		{
			title: t('achievements.heading'),
			url: PUBLIC_URL.achievements(),
			icon: Award
		}
	]

	if (role === 'ADMIN' || role === 'CREATOR') {
		baseFields.push({
			title: t('admin.heading'),
			url: PRIVATE_URL.admin(),
			icon: Shield
		})
	}

	return baseFields
}
