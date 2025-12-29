import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { changeUsername } from '@/entities/User/model/api/userApi'

import { handleApiError } from '@/shared/utils/handleApiError'

import {
	ChangeUsernameRequest,
	ChangeUsernameSchema
} from '../validation/change-username.z.validation'

export const useChangeUsername = () => {
	const form = useForm<ChangeUsernameRequest>({
		resolver: zodResolver(ChangeUsernameSchema),
		defaultValues: {
			username: ''
		}
	})

	const { mutate } = useMutation({
		mutationKey: ['update user data'],
		mutationFn: (data: ChangeUsernameRequest) => changeUsername(data),
		onSuccess: () => {
			form.reset()
			toast.success('Данные успешно изменены')
		},
		onError: handleApiError
	})

	const onSubmit: SubmitHandler<ChangeUsernameRequest> = data => mutate(data)

	return {
		form,
		onSubmit
	}
}
