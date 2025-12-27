import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { changeNickname } from '@/entities/User/model/api/userApi'

import {
	ChangeNicknameRequest,
	ChangeNicknameSchema
} from '../validation/change-nickname.z.validation'

export const useChangeNickname = () => {
	const form = useForm<ChangeNicknameRequest>({
		resolver: zodResolver(ChangeNicknameSchema),
		defaultValues: {
			nickname: ''
		}
	})

	const { mutate } = useMutation({
		mutationKey: ['update user data'],
		mutationFn: (data: ChangeNicknameRequest) => changeNickname(data),
		onSuccess: () => {
			form.reset()
			toast.success('Данные успешно изменены')
		},
		onError(err) {
			if (err.message) toast.error(err.message)
			else toast.error('Ошибка при изменении данных')
		}
	})

	const onSubmit: SubmitHandler<ChangeNicknameRequest> = data => mutate(data)

	return {
		form,
		onSubmit
	}
}
