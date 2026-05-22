'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	ChangeEmailRequest,
	ChangeEmailSchema,
	useChangeEmailMutation
} from '@/entities/User'

export const useChangeEmail = () => {
	const t = useTranslations()
	const { changeEmail, changeEmailPending } = useChangeEmailMutation()

	const form = useForm<ChangeEmailRequest>({
		resolver: zodResolver(ChangeEmailSchema),
		defaultValues: {
			email: ''
		}
	})

	const onSubmit: SubmitHandler<ChangeEmailRequest> = data =>
		changeEmail(data, {
			onSuccess: () => {
				form.reset()
				toast.success(t('profile.settings.security.emailChanged'))
			}
		})

	return {
		form,
		changeEmailPending,
		onSubmit
	}
}
