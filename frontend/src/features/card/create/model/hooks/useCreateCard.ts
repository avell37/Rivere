'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { createCard } from '@/entities/Card/model/api/cardApi'

import {
	CreateCardRequest,
	CreateCardSchema
} from '../validation/create-card.z.validation'

export const useCreateCard = (columnId: string) => {
	const form = useForm<CreateCardRequest>({
		resolver: zodResolver(CreateCardSchema),
		defaultValues: {
			title: ''
		}
	})

	const { mutate } = useMutation({
		mutationKey: ['create card'],
		mutationFn: (data: CreateCardRequest) =>
			createCard({ columnId, ...data }),
		onSuccess: () => {
			form.reset()
			toast.success('Карточка успешно создана.')
		},
		onError(err) {
			if (err.message) {
				toast.error(err.message)
			} else {
				toast.error('Ошибка при создании карточки.')
			}
		}
	})

	const onSubmit: SubmitHandler<CreateCardRequest> = data => mutate(data)

	return {
		form,
		onSubmit
	}
}
