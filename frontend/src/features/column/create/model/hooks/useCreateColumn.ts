'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { IColumn, createColumn } from '@/entities/Column'

import { handleApiError } from '@/shared/utils'

import {
	CreateColumnRequest,
	CreateColumnSchema
} from '../validation/create-column.z.validation'

export const useCreateColumn = (boardId: string) => {
	const queryClient = useQueryClient()
	const t = useTranslations()
	const form = useForm<CreateColumnRequest>({
		resolver: zodResolver(CreateColumnSchema),
		defaultValues: {
			title: ''
		}
	})

	const { mutate } = useMutation<IColumn, unknown, CreateColumnRequest>({
		mutationKey: ['create column'],
		mutationFn: (data: CreateColumnRequest) =>
			createColumn({ boardId, ...data }),
		onSuccess: () => {
			form.reset()
			queryClient.invalidateQueries({ queryKey: ['get board', boardId] })
			toast.success(t('column.create.createSuccess'))
		},
		onError: err => handleApiError(err, t)
	})

	const onSubmit: SubmitHandler<CreateColumnRequest> = data => mutate(data)

	return {
		form,
		onSubmit
	}
}
