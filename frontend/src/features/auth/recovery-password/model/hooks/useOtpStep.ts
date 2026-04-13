'use client'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'

import { handleApiError } from '@/shared/utils'

import { resetPassword, verifyResetToken } from '../api/recoveryApi'

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

	const { mutate: resend, isPending: isResending } = useMutation({
		mutationKey: ['resend recovery code'],
		mutationFn: () => resetPassword({ email }),
		onSuccess: () => {
			toast.success(t('auth.recoveryPassword.sendCode'))
		},
		onError: err => handleApiError(err, t)
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['verify reset token'],
		mutationFn: (data: { token: string }) => verifyResetToken(data),
		onSuccess: data => {
			toast.success(t('auth.recoveryPassword.tokenSuccess'))
			setToken(otp)
			onNext()
		},
		onError: err => handleApiError(err, t)
	})

	const verifyToken = (value: string) => mutate({ token: value })

	return {
		otp,
		isPending,
		isResending,
		resend,
		setOtp,
		verifyToken
	}
}
