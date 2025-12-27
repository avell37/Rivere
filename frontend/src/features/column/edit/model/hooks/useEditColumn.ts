'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { updateColumn } from '@/entities/Column/model/api/columnApi'

import {
	EditColumnRequest,
	EditColumnSchema
} from '../validation/edit-column.z.validation'

export const useEditColumn = (columnId: string) => {
	const form = useForm<EditColumnRequest>({
		resolver: zodResolver(EditColumnSchema),
		defaultValues: {
			title: ''
		}
	})

	const { mutate } = useMutation({
		mutationKey: ['update column'],
		mutationFn: (data: EditColumnRequest) =>
			updateColumn({ columnId, ...data }),
		onSuccess: () => {
			form.reset()
			toast.success('Колонка успешно отредактирована.')
		},
		onError(err) {
			if (err.message) {
				toast.error(err.message)
			} else {
				toast.error('Ошибка при редактировании колонки.')
			}
		}
	})

	const onSubmit: SubmitHandler<EditColumnRequest> = data => mutate(data)

	return {
		form,
		onSubmit
	}
}
