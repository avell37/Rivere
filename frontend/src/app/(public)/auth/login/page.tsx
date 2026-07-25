import { createPageMetadata } from '@/shared/libs'

import { LoginForm } from '@/features/auth'

import { AuthWrapper } from '@/shared/ui/custom'

export const generateMetadata = () => createPageMetadata('auth.login')

export default function LoginPage() {
	return (
		<AuthWrapper>
			<LoginForm />
		</AuthWrapper>
	)
}
