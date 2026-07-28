import { createPageMetadata } from '@/shared/libs'

import { Terms } from '@/widgets/Terms/ui/Terms'
import { MainHeader } from '@/widgets'

export const generateMetadata = () => createPageMetadata('terms', { path: '/terms' })

export default function TermsPage() {
	return (
		<div>
			<MainHeader />
			<Terms />
		</div>
	)
}
