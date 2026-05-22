'use client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'

import {
	useSendTokenMutation,
	useVerifyEmailMutation
} from './useVerifyQueries'

export const useVerifyEmail = (options?: { onSuccess?: () => void }) => {
	const [code, setCode] = useState('')
	const t = useTranslations()

	const { sendToken, sendTokenPending } = useSendTokenMutation()
	const { verifyEmail, verifyEmailPending } = useVerifyEmailMutation()

	const sendVerificationToken = () =>
		sendToken(undefined, {
			onSuccess: () => {
				toast.success(t('auth.verifyEmail.sendCode'))
			}
		})

	const handleVerifyEmail = () =>
		verifyEmail(code, {
			onSuccess: () => {
				toast.success(t('auth.verifyEmail.successVerified'))
				if (options?.onSuccess) {
					options.onSuccess()
				}
			},
			onError: () => {
				setCode('')
			}
		})

	return {
		code,
		verifyEmailPending,
		setCode,
		sendVerificationToken,
		sendTokenPending,
		handleVerifyEmail
	}
}
