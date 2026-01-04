'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { PUBLIC_URL } from '@/shared/libs/constants/url.config'
import { handleApiError } from '@/shared/utils/handleApiError'

import { login } from '../api/authApi'
import { SignInRequest, loginSchema } from '../validation/login.z.validation'

export const useLogin = () => {
	const [showPassword, setShowPassword] = useState(false)
	const router = useRouter()
	const t = useTranslations('error')

	const form = useForm<SignInRequest>({
		resolver: zodResolver(loginSchema),
		defaultValues: { login: '', password: '' }
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['auth user'],
		mutationFn: (data: SignInRequest) => login(data),
		onSuccess: () => {
			form.reset()
			toast.success('Успешно')
			router.replace(PUBLIC_URL.boards())
		},
		onError: handleApiError
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
