import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	changeDisplayUsername,
	changeEmail
} from '@/entities/User/model/api/userApi'

import {
	ChangeDisplayUsernameRequest,
	ChangeDisplayUsernameSchema
} from '../validation/change-display-username.z.validation'

export const useChangeDisplayUsername = () => {
	const form = useForm<ChangeDisplayUsernameRequest>({
		resolver: zodResolver(ChangeDisplayUsernameSchema),
		defaultValues: {
			displayUsername: ''
		}
	})

	const { mutate } = useMutation({
		mutationKey: ['update user data'],
		mutationFn: (data: ChangeDisplayUsernameRequest) =>
			changeDisplayUsername(data),
		onSuccess: () => {
			form.reset()
			toast.success('Данные успешно изменены')
		},
		onError(err) {
			if (err.message) toast.error(err.message)
			else toast.error('Ошибка при изменении данных')
		}
	})

	const onSubmit: SubmitHandler<ChangeDisplayUsernameRequest> = data =>
		mutate(data)

	return {
		form,
		onSubmit
	}
}
