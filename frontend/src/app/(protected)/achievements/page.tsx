import { createPrivatePageMetadata } from '@/shared/libs'

import { Achievements } from '@/features/achievements'

export const generateMetadata = () => createPrivatePageMetadata('achievements')

export default function AchievementsPage() {
	return <Achievements />
}
