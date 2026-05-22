'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'

import { IUser } from '@/entities/User'

import { handleApiError } from '@/shared/utils'

import { sendVerifyToken, verifyAccount } from '../api/verifyApi'

export const verifyKeys = {
	sendToken: ['send-token'],
	verifyEmail: ['verify-email']
}

export const useSendTokenMutation = () => {
	const t = useTranslations()

	const { mutate: sendToken, isPending: sendTokenPending } = useMutation({
		mutationKey: verifyKeys.sendToken,
		mutationFn: sendVerifyToken,
		onError: err => handleApiError(err, t)
	})

	return {
		sendToken,
		sendTokenPending
	}
}

export const useVerifyEmailMutation = () => {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const { mutate: verifyEmail, isPending: verifyEmailPending } = useMutation({
		mutationKey: verifyKeys.verifyEmail,
		mutationFn: verifyAccount,
		onSuccess: () => {
			queryClient.setQueryData(['get user data'], (oldData: IUser) => ({
				...oldData,
				isEmailVerified: true
			}))
		},
		onError: err => handleApiError(err, t)
	})

	return {
		verifyEmail,
		verifyEmailPending
	}
}
