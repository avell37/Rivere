'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { handleApiError } from '@/shared/utils'

import { resetPassword } from '../api/recoveryApi'
import { EmailRequest, emailSchema } from '../validation/email.z.validation'

export const useEmailStep = ({
	onNext
}: {
	onNext: (email: string) => void
}) => {
	const t = useTranslations()

	const form = useForm<EmailRequest, unknown>({
		resolver: zodResolver(emailSchema),
		defaultValues: { email: '' }
	})

	const { mutate: sendCode, isPending } = useMutation({
		mutationKey: ['send recovery code'],
		mutationFn: (data: EmailRequest) => resetPassword(data),
		onError: err => handleApiError(err, t)
	})

	const onSubmit: SubmitHandler<EmailRequest> = data => {
		sendCode(data, {
			onSuccess: () => {
				toast.success(t('auth.recoveryPassword.sendCode'))
				onNext(data.email)
			}
		})
	}

	return {
		form,
		isPending,
		onSubmit
	}
}
