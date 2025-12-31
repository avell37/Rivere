import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { changeNickname } from '@/entities/User/model/api/userApi'

import { handleApiError } from '@/shared/utils/handleApiError'

import {
	ChangeNicknameRequest,
	ChangeNicknameSchema
} from '../validation/change-nickname.z.validation'

export const useChangeNickname = () => {
	const queryClient = useQueryClient()
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
			queryClient.invalidateQueries({ queryKey: ['get user data'] })
		},
		onError: handleApiError
	})

	const onSubmit: SubmitHandler<ChangeNicknameRequest> = data => mutate(data)

	return {
		form,
		onSubmit
	}
}
