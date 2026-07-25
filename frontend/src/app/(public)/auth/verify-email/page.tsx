import { createPageMetadata } from '@/shared/libs'

import { VerifyEmail } from '@/features/auth'

export const generateMetadata = () => createPageMetadata('auth.verifyEmail')

export default function VerifyEmailPage() {
	return <VerifyEmail />
}
