import { Award, Shield, SquareKanban, SquareMenu } from 'lucide-react'

import { ADMIN_URL, PRIVATE_URL } from '@/shared/libs'

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
			url: PRIVATE_URL.boards(),
			icon: SquareKanban
		},
		{
			title: t('statistics.heading'),
			url: PRIVATE_URL.statistics(),
			icon: SquareMenu
		},
		{
			title: t('achievements.heading'),
			url: PRIVATE_URL.achievements(),
			icon: Award
		}
	]

	if (role === 'ADMIN' || role === 'CREATOR') {
		baseFields.push({
			title: t('admin.heading'),
			url: ADMIN_URL.admin(),
			icon: Shield
		})
	}

	return baseFields
}
