import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { logout } from '@/entities/User/model/api/userApi'

import { PUBLIC_URL } from '@/shared/libs/constants/url.config'
import { handleApiError } from '@/shared/utils/handleApiError'

export const useLogout = () => {
	const router = useRouter()
	const t = useTranslations()

	const { mutate: logoutUser, isPending } = useMutation({
		mutationKey: ['logout user'],
		mutationFn: logout,
		onSuccess: () => {
			toast.success('Вы успешно вышли из аккаунта')
			router.push(`${PUBLIC_URL.auth()}/login`)
		},
		onError: err => handleApiError(err, t)
	})

	return {
		logoutUser,
		isPending
	}
}
