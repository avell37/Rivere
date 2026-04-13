import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { RecoveryPassword } from '@/features/auth/recovery-password/ui/RecoveryPassword'

import { AuthWrapper } from '@/shared/ui/custom'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('auth.recoveryPassword')

	return {
		title: t('heading')
	}
}

export default function RecoveryPasswordPage() {
	return (
		<AuthWrapper showHeader={false}>
			<RecoveryPassword />
		</AuthWrapper>
	)
}
