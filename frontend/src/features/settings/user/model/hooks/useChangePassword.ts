'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	ChangePasswordRequest,
	ChangePasswordSchema,
	useChangePasswordMutation
} from '@/entities/User'

export const useChangePassword = () => {
	const [showPasswords, setShowPasswords] = useState(false)

	const t = useTranslations()
	const { changePassword, changePasswordPending } =
		useChangePasswordMutation()

	const form = useForm<ChangePasswordRequest>({
		resolver: zodResolver(ChangePasswordSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: ''
		},
		mode: 'onBlur'
	})

	const passwordType = showPasswords ? 'text' : 'password'

	const togglePasswords = () => {
		setShowPasswords(prev => !prev)
	}

	const onSubmit: SubmitHandler<ChangePasswordRequest> = data =>
		changePassword(data, {
			onSuccess: () => {
				form.reset()
				toast.success(t('profile.settings.security.passwordChanged'))
			}
		})

	return {
		form,
		passwordType,
		changePasswordPending,
		onSubmit,
		togglePasswords
	}
}
