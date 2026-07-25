import { createPageMetadata } from '@/shared/libs'

import { Privacy } from '@/widgets/Privacy/ui/Privacy'

import { MainHeader } from '@/widgets'

export const generateMetadata = () => createPageMetadata('privacy')

export default function PrivacyPage() {
	return (
		<div>
			<MainHeader />
			<Privacy />
		</div>
	)
}
