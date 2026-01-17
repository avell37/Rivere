'use client'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { logout } from '@/entities/User'

import { ISessionActionsResponse } from '@/features/sessions'

import { PUBLIC_URL } from '@/shared/libs'
import { handleApiError } from '@/shared/utils'

export const useLogout = () => {
	const router = useRouter()
	const t = useTranslations()

	const { mutate: logoutUser, isPending } = useMutation<
		ISessionActionsResponse,
		unknown
	>({
		mutationKey: ['logout user'],
		mutationFn: logout,
		onSuccess: () => {
			toast.success(t('account.logout'))
			router.push(`${PUBLIC_URL.auth()}/login`)
		},
		onError: err => handleApiError(err, t)
	})

	return {
		logoutUser,
		isPending
	}
}
