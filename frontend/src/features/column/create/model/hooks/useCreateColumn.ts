'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	CreateColumnRequest,
	CreateColumnSchema,
	useCreateColumnMutation
} from '@/entities/Column'

export const useCreateColumn = ({
	boardId,
	onSuccess
}: {
	boardId: string
	onSuccess: () => void
}) => {
	const t = useTranslations()
	const { createColumn, createColumnPending } =
		useCreateColumnMutation(boardId)

	const form = useForm<CreateColumnRequest>({
		resolver: zodResolver(CreateColumnSchema),
		defaultValues: {
			title: ''
		}
	})

	const onSubmit: SubmitHandler<CreateColumnRequest> = data =>
		createColumn(data, {
			onSuccess: () => {
				form.reset()
				toast.success(t('column.create.createSuccess'))
				onSuccess()
			}
		})

	return {
		form,
		createColumnPending,
		onSubmit
	}
}
