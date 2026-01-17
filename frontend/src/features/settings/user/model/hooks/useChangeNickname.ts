'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { changeNickname } from '@/entities/User'

import { handleApiError } from '@/shared/utils'

import {
	ChangeNicknameRequest,
	ChangeNicknameSchema
} from '../validation/change-nickname.z.validation'

export const useChangeNickname = () => {
	const t = useTranslations()
	const queryClient = useQueryClient()
	const form = useForm<ChangeNicknameRequest>({
		resolver: zodResolver(ChangeNicknameSchema),
		defaultValues: {
			nickname: ''
		}
	})

	const { mutate } = useMutation({
		mutationKey: ['update user data'],
		mutationFn: (data: ChangeNicknameRequest) => changeNickname(data),
		onSuccess: () => {
			form.reset()
			queryClient.invalidateQueries({ queryKey: ['get user data'] })
			toast.success('Данные успешно изменены')
		},
		onError: err => handleApiError(err, t)
	})

	const onSubmit: SubmitHandler<ChangeNicknameRequest> = data => mutate(data)

	return {
		form,
		onSubmit
	}
}
