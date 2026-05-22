'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	EditColumnRequest,
	EditColumnSchema,
	useUpdateColumnMutation
} from '@/entities/Column'

import { EditColumnProps } from '../types/EditColumnProps'

export const useEditColumn = ({
	columnId,
	boardId,
	onSuccess
}: EditColumnProps) => {
	const t = useTranslations()

	const { updateColumn, updateColumnPending } = useUpdateColumnMutation({
		columnId,
		boardId
	})

	const form = useForm<EditColumnRequest>({
		resolver: zodResolver(EditColumnSchema),
		defaultValues: {
			title: ''
		}
	})

	const onSubmit: SubmitHandler<EditColumnRequest> = data =>
		updateColumn(data, {
			onSuccess: () => {
				form.reset()
				toast.success(t('column.edit.editSuccess'))
				onSuccess()
			}
		})

	return {
		form,
		updateColumnPending,
		onSubmit
	}
}
