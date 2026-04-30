'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { PUBLIC_URL } from '@/shared/libs'
import { AuthResponse } from '@/shared/types/AuthResponse'
import { handleApiError } from '@/shared/utils'

import { register } from '../api/registerApi'
import {
	SignUpRequest,
	registerSchema
} from '../validation/register.z.validation'

export const useRegister = () => {
	const [showPassword, setShowPassword] = useState(false)
	const router = useRouter()
	const t = useTranslations()

	const form = useForm<SignUpRequest>({
		resolver: zodResolver(registerSchema),
		defaultValues: { username: '', email: '', password: '', privacy: false }
	})

	const { mutate, isPending } = useMutation<
		AuthResponse,
		unknown,
		SignUpRequest
	>({
		mutationKey: ['register user'],
		mutationFn: (data: SignUpRequest) => register(data),
		onSuccess: () => {
			form.reset()
			router.replace(PUBLIC_URL.verifyEmail())
		},
		onError: err => handleApiError(err, t)
	})

	const onSubmit: SubmitHandler<SignUpRequest> = data => {
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
