import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { changePassword } from '@/entities/User/model/api/userApi'

import { handleApiError } from '@/shared/utils/handleApiError'

import {
	ChangePasswordRequest,
	ChangePasswordSchema
} from '../validation/change-password.z.validation'

export const useChangePassword = () => {
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

	const { mutate } = useMutation({
		mutationKey: ['change password'],
		mutationFn: (data: ChangePasswordRequest) => changePassword(data),
		onSuccess: () => {
			form.reset()
			toast.success('Пароль успешно изменен')
		},
		onError: handleApiError
	})

	const passwordType = showPasswords ? 'text' : 'password'

	const togglePasswords = () => {
		setShowPasswords(prev => !prev)
	}

	const onSubmit: SubmitHandler<ChangePasswordRequest> = data => mutate(data)

	return {
		form,
		passwordType,
		onSubmit,
		togglePasswords
	}
}
