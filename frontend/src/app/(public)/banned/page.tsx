import { createPageMetadata } from '@/shared/libs'

import { Banned } from '@/widgets/Banned/Banned'

export const generateMetadata = () => createPageMetadata('banned')

export default function BannedPage() {
	return <Banned />
}
