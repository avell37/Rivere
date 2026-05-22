'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { EmailRequest, emailSchema } from '../validation/email.z.validation'

import { useSendEmailCode } from './useRecoveryPasswordQueries'

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

	const { sendCode, sendCodePending } = useSendEmailCode()

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
		sendCodePending,
		onSubmit
	}
}
