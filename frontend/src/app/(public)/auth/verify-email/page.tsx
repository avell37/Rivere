import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { VerifyEmail } from '@/features/auth'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('auth.verifyEmail')

	return {
		title: t('heading')
	}
}

export default function VerifyEmailPage() {
	return <VerifyEmail />
}
