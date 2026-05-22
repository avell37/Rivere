'use client'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'

import { ActionResponse } from '@/shared/types'
import { handleApiError } from '@/shared/utils'

import {
	createNewPassword,
	resetPassword,
	verifyResetToken
} from '../api/recoveryPasswordApi'
import { CreateNewPasswordInput } from '../types/RecoveryProps'
import { EmailRequest } from '../validation/email.z.validation'

export const recoveryPasswordKeys = {
	sendRecoveryCode: ['send-recovery-code'],
	resendRecoveryCode: ['resend-recovery-code'],
	verifyResetToken: ['verify-reset-token'],
	setNewPassword: ['set-new-password']
}

export const useSendEmailCode = () => {
	const t = useTranslations()

	const {
		mutate: sendCode,
		isPending: sendCodePending,
		isError: sendCodeError
	} = useMutation<ActionResponse, AxiosError, EmailRequest>({
		mutationKey: recoveryPasswordKeys.sendRecoveryCode,
		mutationFn: resetPassword,
		onError: err => handleApiError(err, t)
	})

	return {
		sendCode,
		sendCodePending,
		sendCodeError
	}
}

export const useResendCode = () => {
	const t = useTranslations()

	const {
		mutate: resendCode,
		isPending: resendCodePending,
		isError: resendCodeError
	} = useMutation<ActionResponse, AxiosError, EmailRequest>({
		mutationKey: recoveryPasswordKeys.resendRecoveryCode,
		mutationFn: resetPassword,
		onError: err => handleApiError(err, t)
	})

	return {
		resendCode,
		resendCodePending,
		resendCodeError
	}
}

export const useVerifyToken = () => {
	const t = useTranslations()

	const {
		mutate: verifyToken,
		isPending: verifyTokenPending,
		isError: verifyTokenError
	} = useMutation<ActionResponse, AxiosError, { token: string }>({
		mutationKey: recoveryPasswordKeys.verifyResetToken,
		mutationFn: verifyResetToken,
		onError: err => handleApiError(err, t)
	})

	return {
		verifyToken,
		verifyTokenPending,
		verifyTokenError
	}
}

export const useSetNewPassword = () => {
	const t = useTranslations()

	const {
		mutate: setPassword,
		isPending: setPasswordPending,
		isError: setPasswordError
	} = useMutation<ActionResponse, AxiosError, CreateNewPasswordInput>({
		mutationKey: recoveryPasswordKeys.setNewPassword,
		mutationFn: createNewPassword,
		onError: err => handleApiError(err, t)
	})

	return {
		setPassword,
		setPasswordPending,
		setPasswordError
	}
}
