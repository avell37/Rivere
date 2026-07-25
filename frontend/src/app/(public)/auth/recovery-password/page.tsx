import { createPageMetadata } from '@/shared/libs'

import { RecoveryPassword } from '@/features/auth'

import { AuthWrapper } from '@/shared/ui/custom'

export const generateMetadata = () =>
	createPageMetadata('auth.recoveryPassword')

export default function RecoveryPasswordPage() {
	return (
		<AuthWrapper showHeader={false}>
			<RecoveryPassword />
		</AuthWrapper>
	)
}
