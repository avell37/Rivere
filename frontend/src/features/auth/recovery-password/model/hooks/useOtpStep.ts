'use client'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'

import { useResendCode, useVerifyToken } from './useRecoveryPasswordQueries'

export const useOtpStep = ({
	email,
	onNext,
	setToken
}: {
	email: string
	onNext: () => void
	setToken: (token: string) => void
}) => {
	const t = useTranslations()
	const [otp, setOtp] = useState('')

	const { resendCode, resendCodePending } = useResendCode()
	const { verifyToken, verifyTokenPending } = useVerifyToken()

	const resend = () => {
		resendCode(
			{ email },
			{
				onSuccess: () => {
					toast.success(t('auth.recoveryPassword.sendCode'))
				}
			}
		)
	}

	const verify = (value: string) =>
		verifyToken(
			{ token: value },
			{
				onSuccess: () => {
					setToken(value)
					toast.success(t('auth.recoveryPassword.tokenSuccess'))
					onNext()
				}
			}
		)

	return {
		otp,
		verifyTokenPending,
		resendCodePending,
		resend,
		setOtp,
		verify
	}
}
