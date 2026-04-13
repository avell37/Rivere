import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { RegisterForm } from '@/features/auth'

import { AuthWrapper } from '@/shared/ui/custom'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('auth.register')

	return {
		title: t('heading')
	}
}

export default function RegisterPage() {
	return (
		<AuthWrapper isRegistration={true}>
			<RegisterForm />
		</AuthWrapper>
	)
}
