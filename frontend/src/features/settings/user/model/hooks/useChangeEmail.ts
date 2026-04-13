'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { changeEmail } from '@/entities/User'

import { handleApiError } from '@/shared/utils'

import {
	ChangeEmailRequest,
	ChangeEmailSchema
} from '../validation/change-email.z.validation'

export const useChangeEmail = () => {
	const t = useTranslations()
	const queryClient = useQueryClient()
	const form = useForm<ChangeEmailRequest>({
		resolver: zodResolver(ChangeEmailSchema),
		defaultValues: {
			email: ''
		}
	})

	const { mutate } = useMutation({
		mutationKey: ['update user data'],
		mutationFn: (data: ChangeEmailRequest) => changeEmail(data),
		onSuccess: () => {
			form.reset()
			queryClient.invalidateQueries({ queryKey: ['get user data'] })
			toast.success(t('profile.settings.security.emailChanged'))
		},
		onError: err => handleApiError(err, t)
	})

	const onSubmit: SubmitHandler<ChangeEmailRequest> = data => mutate(data)

	return {
		form,
		onSubmit
	}
}
