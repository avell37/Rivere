'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { PRIVATE_URL } from '@/shared/libs'
import { ActionResponse } from '@/shared/types'
import { handleApiError } from '@/shared/utils'

import { loginApi } from '../api/loginApi'
import { SignInRequest, loginSchema } from '../validation/login.z.validation'

export const useLogin = () => {
	const [showPassword, setShowPassword] = useState(false)
	const router = useRouter()
	const t = useTranslations()
	const searchParams = useSearchParams()

	useEffect(() => {
		const error = searchParams.get('error')

		if (error === 'oauth_failed') {
			toast.error(t('oauthFailed'))
		}

		if (error === 'oauth_denied') {
			toast.error(t('oauthDenied'))
		}
	}, [searchParams, t])

	const form = useForm<SignInRequest, unknown>({
		resolver: zodResolver(loginSchema),
		defaultValues: { login: '', password: '', rememberMe: false }
	})

	const { mutate: login, isPending: loginPending } = useMutation<
		ActionResponse,
		AxiosError,
		SignInRequest
	>({
		mutationKey: ['auth-user'],
		mutationFn: loginApi,
		onError: err => handleApiError(err, t)
	})

	const onSubmit: SubmitHandler<SignInRequest> = data => {
		login(data, {
			onSuccess: () => {
				form.reset()
				toast.success(t('account.auth'))
				router.replace(PRIVATE_URL.boards())
			}
		})
	}

	const toggleShowPassword = () => setShowPassword(prev => !prev)

	return {
		form,
		loginPending,
		showPassword,
		toggleShowPassword,
		onSubmit
	}
}
