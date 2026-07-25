import { createPrivatePageMetadata } from '@/shared/libs'

import { Statistics } from '@/widgets'

export const generateMetadata = () => createPrivatePageMetadata('statistics')

export default function StatisticsPage() {
	return <Statistics />
}
