'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { createColumn } from '@/entities/Column/model/api/columnApi'

import { handleApiError } from '@/shared/utils/handleApiError'

import {
	CreateColumnRequest,
	CreateColumnSchema
} from '../validation/create-column.z.validation'

export const useCreateColumn = (boardId: string) => {
	const t = useTranslations()
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
		onError: err => handleApiError(err, t)
	})

	const onSubmit: SubmitHandler<CreateColumnRequest> = data => mutate(data)

	return {
		form,
		onSubmit
	}
}
