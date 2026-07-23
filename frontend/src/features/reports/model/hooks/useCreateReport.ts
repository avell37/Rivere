'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import type { IMessage } from '@/entities/Chat'

import { ActionResponse } from '@/shared/types'
import { handleApiError } from '@/shared/utils'

import { createReport } from '../api/reports.api'
import { CreateReportInput } from '../types/ReportTypes'
import {
	CreateReportFormSchema,
	CreateReportFormValues
} from '../validation/create-report.z.validation'

export const useCreateReport = ({ message }: { message: IMessage }) => {
	const t = useTranslations()
	const [open, setOpen] = useState(false)

	const form = useForm<CreateReportFormValues>({
		resolver: zodResolver(CreateReportFormSchema),
		defaultValues: {
			reason: '',
			details: ''
		}
	})

	const { mutate, isPending } = useMutation<
		ActionResponse,
		AxiosError,
		CreateReportInput
	>({
		mutationKey: ['create-report'],
		mutationFn: createReport,
		onSuccess: () => {
			toast.success(t('reports.actions.created'))
		},
		onError: err => handleApiError(err, t)
	})

	const onSubmit: SubmitHandler<CreateReportFormValues> = data =>
		mutate(
			{
				targetType: 'MESSAGE',
				targetId: message.id,
				reason: data.reason.trim(),
				details: data.details.trim() || undefined
			},
			{
				onSuccess: () => {
					form.reset()
					setOpen(false)
				}
			}
		)

	const handleOpenChange = (nextOpen: boolean) => {
		setOpen(nextOpen)
		if (!nextOpen) form.reset()
	}

	return {
		open,
		form,
		isPending,
		onSubmit,
		setOpen: handleOpenChange
	}
}
