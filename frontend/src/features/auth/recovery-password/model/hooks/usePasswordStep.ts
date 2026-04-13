'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { PUBLIC_URL } from '@/shared/libs'
import { handleApiError } from '@/shared/utils'

import { createNewPassword } from '../api/recoveryApi'
import {
	PasswordRequest,
	PasswordSchema
} from '../validation/password.z.validation'

export const usePasswordStep = (token: string) => {
	const t = useTranslations()
	const router = useRouter()

	const form = useForm<PasswordRequest, unknown>({
		resolver: zodResolver(PasswordSchema),
		defaultValues: { newPassword: '', confirmPassword: '' }
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['set new password'],
		mutationFn: (data: PasswordRequest) =>
			createNewPassword({
				token,
				newPassword: data.newPassword
			}),
		onSuccess: () => {
			toast.success(t('auth.recoveryPassword.passwordChanged'))
			router.push(PUBLIC_URL.login())
		},
		onError: err => handleApiError(err, t)
	})

	const onSubmit = (data: PasswordRequest) => {
		mutate(data)
	}

	return {
		form,
		isPending,
		onSubmit
	}
}
