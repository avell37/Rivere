import { createPageMetadata } from '@/shared/libs'

import { RegisterForm } from '@/features/auth'

import { AuthWrapper } from '@/shared/ui/custom'

export const generateMetadata = () => createPageMetadata('auth.register')

export default function RegisterPage() {
	return (
		<AuthWrapper isRegistration={true}>
			<RegisterForm />
		</AuthWrapper>
	)
}
