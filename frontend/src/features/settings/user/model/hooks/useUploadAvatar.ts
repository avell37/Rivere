'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import { toast } from 'sonner'

import { uploadAvatar } from '@/entities/User'

import { handleApiError } from '@/shared/utils'

export const useUploadAvatar = () => {
	const t = useTranslations()
	const queryClient = useQueryClient()
	const fileInputRef = useRef<HTMLInputElement>(null)

	const { mutate, isPending } = useMutation({
		mutationKey: ['upload avatar'],
		mutationFn: uploadAvatar,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get user data'] })
			toast.success('Аватар обновлен')
		},
		onError: err => handleApiError(err, t)
	})

	const handleChangeAvatarClick = () => {
		fileInputRef.current?.click()
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		mutate(file)
	}

	return {
		fileInputRef,
		isPending,
		handleChangeAvatarClick,
		handleFileChange
	}
}
