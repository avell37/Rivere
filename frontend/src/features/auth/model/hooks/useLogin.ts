'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { PUBLIC_URL } from '@/shared/libs'
import { handleApiError } from '@/shared/utils'

import { login } from '../api/authApi'
import { AuthResponse } from '../types/AuthResponse'
import { SignInRequest, loginSchema } from '../validation/login.z.validation'

export const useLogin = () => {
	const [showPassword, setShowPassword] = useState(false)
	const router = useRouter()
	const t = useTranslations()

	const form = useForm<SignInRequest, unknown>({
		resolver: zodResolver(loginSchema),
		defaultValues: { login: '', password: '' }
	})

	const { mutate, isPending } = useMutation<
		AuthResponse,
		unknown,
		SignInRequest
	>({
		mutationKey: ['auth user'],
		mutationFn: (data: SignInRequest) => login(data),
		onSuccess: () => {
			form.reset()
			toast.success(t('account.auth'))
			router.replace(PUBLIC_URL.boards())
		},
		onError: err => handleApiError(err, t)
	})

	const onSubmit: SubmitHandler<SignInRequest> = data => {
		mutate(data)
	}

	const toggleShowPassword = () => setShowPassword(prev => !prev)

	return {
		form,
		isPending,
		showPassword,
		toggleShowPassword,
		onSubmit
	}
}
