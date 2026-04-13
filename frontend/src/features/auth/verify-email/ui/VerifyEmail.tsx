'use client'

import { useRouter } from 'next/navigation'

import { PUBLIC_URL } from '@/shared/libs'
import { AuthWrapper } from '@/shared/ui/custom'

import { VerifyEmailForm } from './VerifyEmailForm'

export const VerifyEmail = () => {
	const router = useRouter()

	return (
		<AuthWrapper showHeader={false}>
			<VerifyEmailForm
				onSuccess={() => router.push(PUBLIC_URL.boards())}
			/>
		</AuthWrapper>
	)
}
