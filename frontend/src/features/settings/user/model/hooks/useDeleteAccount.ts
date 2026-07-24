'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	DeleteAccountSchema,
	DeleteAccountValues,
	deleteAccountApi,
	useUserStore
} from '@/entities/User'

import { PUBLIC_URL } from '@/shared/libs'
import { ActionResponse } from '@/shared/types'
import { handleApiError } from '@/shared/utils'

export const useDeleteAccount = () => {
	const t = useTranslations('profile.settings.dangerZone')
	const [open, setOpen] = useState(false)

	const tRoot = useTranslations()
	const router = useRouter()
	const clearUser = useUserStore(state => state.clearUser)

	const form = useForm<DeleteAccountValues>({
		resolver: zodResolver(DeleteAccountSchema),
		defaultValues: {
			currentPassword: ''
		}
	})

	const { mutate, isPending } = useMutation<
		ActionResponse,
		AxiosError,
		string
	>({
		mutationKey: ['delete-account'],
		mutationFn: deleteAccountApi,
		onSuccess: () => {
			clearUser()
			toast.success(t('success'))
			setOpen(false)
			router.push(PUBLIC_URL.login())
		},
		onError: err => handleApiError(err, tRoot)
	})

	const onSubmit = form.handleSubmit(values => {
		mutate(values.currentPassword)
	})

	return {
		form,
		isPending,
		open,
		setOpen,
		onSubmit
	}
}
