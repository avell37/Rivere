'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { changeUsername } from '@/entities/User'

import { handleApiError } from '@/shared/utils'

import {
	ChangeUsernameRequest,
	ChangeUsernameSchema
} from '../validation/change-username.z.validation'

export const useChangeUsername = () => {
	const t = useTranslations()
	const queryClient = useQueryClient()
	const form = useForm<ChangeUsernameRequest>({
		resolver: zodResolver(ChangeUsernameSchema),
		defaultValues: {
			username: ''
		}
	})

	const { mutate } = useMutation({
		mutationKey: ['update user data'],
		mutationFn: (data: ChangeUsernameRequest) => changeUsername(data),
		onSuccess: () => {
			form.reset()
			queryClient.invalidateQueries({ queryKey: ['get user data'] })
			toast.success(t('profile.settings.security.usernameChanged'))
		},
		onError: err => handleApiError(err, t)
	})

	const onSubmit: SubmitHandler<ChangeUsernameRequest> = data => mutate(data)

	return {
		form,
		onSubmit
	}
}
