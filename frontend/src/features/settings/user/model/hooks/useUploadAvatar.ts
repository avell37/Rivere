'use client'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import { toast } from 'sonner'

import { useUploadAvatarMutation } from '@/entities/User'

export const useUploadAvatar = () => {
	const t = useTranslations()
	const fileInputRef = useRef<HTMLInputElement>(null)

	const { uploadAvatar, uploadAvatarPending } = useUploadAvatarMutation()

	const handleChangeAvatarClick = () => {
		fileInputRef.current?.click()
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		uploadAvatar(file, {
			onSuccess: () => {
				toast.success(t('profile.settings.security.avatarChanged'))
			}
		})
	}

	return {
		fileInputRef,
		uploadAvatarPending,
		handleChangeAvatarClick,
		handleFileChange
	}
}
