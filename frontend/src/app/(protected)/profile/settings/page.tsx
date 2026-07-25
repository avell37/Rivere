import { createPrivatePageMetadata } from '@/shared/libs'

import { UserSettings } from '@/widgets/Settings'

export const generateMetadata = () =>
	createPrivatePageMetadata('profile.settings')

export default function UserSettingsPage() {
	return <UserSettings />
}
