'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { PUBLIC_URL } from '@/shared/libs'

import {
	PasswordRequest,
	PasswordSchema
} from '../validation/password.z.validation'

import { useSetNewPassword } from './useRecoveryPasswordQueries'

export const usePasswordStep = (token: string) => {
	const t = useTranslations()
	const router = useRouter()

	const form = useForm<PasswordRequest, unknown>({
		resolver: zodResolver(PasswordSchema),
		defaultValues: { newPassword: '', confirmPassword: '' }
	})

	const { setPassword, setPasswordPending } = useSetNewPassword()

	const onSubmit = (data: PasswordRequest) => {
		setPassword(
			{
				token,
				newPassword: data.newPassword
			},
			{
				onSuccess: () => {
					toast.success(t('auth.recoveryPassword.passwordChanged'))
					router.push(PUBLIC_URL.login())
				}
			}
		)
	}

	return {
		form,
		setPasswordPending,
		onSubmit
	}
}
