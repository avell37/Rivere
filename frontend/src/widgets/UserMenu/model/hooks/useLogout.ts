import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { logout } from '@/entities/User/model/api/userApi'

import { PUBLIC_URL } from '@/shared/libs/constants/url.config'

export const useLogout = () => {
	const router = useRouter()

	const { mutate: logoutUser, isPending } = useMutation({
		mutationKey: ['logout user'],
		mutationFn: logout,
		onSuccess: () => {
			toast.success('Вы успешно вышли из аккаунта')
			router.push(`${PUBLIC_URL.auth()}/login`)
		}
	})

	return {
		logoutUser,
		isPending
	}
}
