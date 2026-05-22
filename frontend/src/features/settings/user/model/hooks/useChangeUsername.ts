'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	ChangeUsernameRequest,
	ChangeUsernameSchema,
	useChangeUsernameMutation
} from '@/entities/User'

export const useChangeUsername = () => {
	const t = useTranslations()
	const { changeUsername, changeUsernamePending } =
		useChangeUsernameMutation()

	const form = useForm<ChangeUsernameRequest>({
		resolver: zodResolver(ChangeUsernameSchema),
		defaultValues: {
			username: ''
		}
	})

	const onSubmit: SubmitHandler<ChangeUsernameRequest> = data =>
		changeUsername(data, {
			onSuccess: () => {
				form.reset()
				toast.success(t('profile.settings.security.usernameChanged'))
			}
		})

	return {
		form,
		changeUsernamePending,
		onSubmit
	}
}
