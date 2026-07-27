import { createPageMetadata } from '@/shared/libs'
import { Suspense } from 'react'

import { LoginForm } from '@/features/auth'

import { AuthWrapper } from '@/shared/ui/custom'

export const generateMetadata = () => createPageMetadata('auth.login')

export default function LoginPage() {
	return (
		<AuthWrapper>
			<Suspense fallback={null}>
				<LoginForm />
			</Suspense>
		</AuthWrapper>
	)
}
