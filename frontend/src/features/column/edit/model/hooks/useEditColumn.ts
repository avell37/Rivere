'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { updateColumn } from '@/entities/Column/model/api/columnApi'

import { handleApiError } from '@/shared/utils/handleApiError'

import {
	EditColumnRequest,
	EditColumnSchema
} from '../validation/edit-column.z.validation'

export const useEditColumn = (columnId: string) => {
	const t = useTranslations()
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
		onError: err => handleApiError(err, t)
	})

	const onSubmit: SubmitHandler<EditColumnRequest> = data => mutate(data)

	return {
		form,
		onSubmit
	}
}
