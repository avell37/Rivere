import { useMutation } from '@tanstack/react-query'
import { useRef } from 'react'
import { toast } from 'sonner'

import { uploadAvatar } from '@/entities/User/model/api/userApi'

export const useUploadAvatar = () => {
	const fileInputRef = useRef<HTMLInputElement>(null)

	const { mutate, isPending } = useMutation({
		mutationKey: ['upload avatar'],
		mutationFn: uploadAvatar,
		onSuccess: () => {
			toast.success('Аватар обновлен')
		},
		onError: () => {
			toast.error('Ошибка загрузки аватара')
		}
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
