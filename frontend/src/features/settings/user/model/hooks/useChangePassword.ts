'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { changePassword } from '@/entities/User'

import { handleApiError } from '@/shared/utils'

import {
	ChangePasswordRequest,
	ChangePasswordSchema
} from '../validation/change-password.z.validation'

export const useChangePassword = () => {
	const t = useTranslations()
	const queryClient = useQueryClient()
	const [showPasswords, setShowPasswords] = useState(false)
	const form = useForm<ChangePasswordRequest>({
		resolver: zodResolver(ChangePasswordSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: ''
		},
		mode: 'onBlur'
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['change password'],
		mutationFn: (data: ChangePasswordRequest) => changePassword(data),
		onSuccess: () => {
			form.reset()
			queryClient.invalidateQueries({ queryKey: ['get user data'] })
			toast.success(t('profile.settings.security.passwordChanged'))
		},
		onError: err => handleApiError(err, t)
	})

	const passwordType = showPasswords ? 'text' : 'password'

	const togglePasswords = () => {
		setShowPasswords(prev => !prev)
	}

	const onSubmit: SubmitHandler<ChangePasswordRequest> = data => mutate(data)

	return {
		form,
		passwordType,
		isPending,
		onSubmit,
		togglePasswords
	}
}
