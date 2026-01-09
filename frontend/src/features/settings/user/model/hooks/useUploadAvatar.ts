import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import { toast } from 'sonner'

import { uploadAvatar } from '@/entities/User/model/api/userApi'

import { handleApiError } from '@/shared/utils/handleApiError'

export const useUploadAvatar = () => {
	const t = useTranslations()
	const queryClient = useQueryClient()
	const fileInputRef = useRef<HTMLInputElement>(null)

	const { mutate, isPending } = useMutation({
		mutationKey: ['upload avatar'],
		mutationFn: uploadAvatar,
		onSuccess: () => {
			toast.success('Аватар обновлен')
			queryClient.invalidateQueries({ queryKey: ['get user data'] })
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
