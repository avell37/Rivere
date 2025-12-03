'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { createColumn } from '@/entities/Column/model/api/columnApi'

import {
	CreateColumnRequest,
	CreateColumnSchema
} from '../validation/create-column.z.validation'

export const useCreateColumn = (boardId: string) => {
	const form = useForm<CreateColumnRequest>({
		resolver: zodResolver(CreateColumnSchema),
		defaultValues: {
			title: ''
		}
	})

	const { mutate } = useMutation({
		mutationKey: ['create column'],
		mutationFn: (data: CreateColumnRequest) =>
			createColumn({ boardId, ...data }),
		onSuccess: () => {
			form.reset()
			toast.success('Колонка успешно создана.')
		},
		onError(err) {
			if (err.message) {
				toast.error(err.message)
			} else {
				toast.error('Ошибка при создании колонки.')
			}
		}
	})

	const onSubmit: SubmitHandler<CreateColumnRequest> = data => mutate(data)

	return {
		form,
		onSubmit
	}
}
