'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { handleApiError } from '@/shared/utils'

import { sendVerifyToken, verifyAccount } from '../api/verifyApi'

export const useVerifyEmail = (options?: { onSuccess?: () => void }) => {
	const [code, setCode] = useState('')
	const router = useRouter()
	const t = useTranslations()
	const queryClient = useQueryClient()

	const { mutate: sendToken } = useMutation({
		mutationKey: ['send token'],
		mutationFn: () => sendVerifyToken(),
		onSuccess: () => {
			toast.success(t('auth.verifyEmail.sendCode'))
		},
		onError: err => handleApiError(err, t)
	})

	const {
		mutate: verifyEmail,
		isPending,
		isError,
		isSuccess
	} = useMutation({
		mutationKey: ['verify email'],
		mutationFn: (code: string) => verifyAccount(code),
		onSuccess: () => {
			queryClient.setQueryData(['get user data'], (oldData: any) => ({
				...oldData,
				isEmailVerified: true
			}))
			toast.success(t('auth.verifyEmail.successVerified'))
			if (options?.onSuccess) {
				options.onSuccess()
			}
		},
		onError: err => {
			handleApiError(err, t)
			setCode('')
		}
	})

	const sendVerificationToken = () => sendToken()

	return {
		code,
		isPending,
		isError,
		isSuccess,
		setCode,
		sendVerificationToken,
		verifyEmail
	}
}
