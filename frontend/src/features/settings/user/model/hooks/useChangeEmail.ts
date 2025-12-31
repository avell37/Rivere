import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { changeEmail } from '@/entities/User/model/api/userApi'

import { handleApiError } from '@/shared/utils/handleApiError'

import {
	ChangeEmailRequest,
	ChangeEmailSchema
} from '../validation/change-email.z.validation'

export const useChangeEmail = () => {
	const queryClient = useQueryClient()
	const form = useForm<ChangeEmailRequest>({
		resolver: zodResolver(ChangeEmailSchema),
		defaultValues: {
			email: ''
		}
	})

	const { mutate } = useMutation({
		mutationKey: ['update user data'],
		mutationFn: (data: ChangeEmailRequest) => changeEmail(data),
		onSuccess: () => {
			form.reset()
			toast.success('Данные успешно изменены')
			queryClient.invalidateQueries({ queryKey: ['get user data'] })
		},
		onError: handleApiError
	})

	const onSubmit: SubmitHandler<ChangeEmailRequest> = data => mutate(data)

	return {
		form,
		onSubmit
	}
}
