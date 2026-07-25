'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { BanDurationUnit } from '@/shared/ui/custom'
import { handleApiError } from '@/shared/utils'

import { resolveAdminReport } from '../api/admin-reports.api'
import { IReport } from '../types/AdminReportTypes'
import { mapToPayload } from '../utils/reportMaptoPayload'
import {
	ResolveReportFormSchema,
	ResolveReportFormValues,
	ResolveReportPayload
} from '../validation/resolve-report.z.validation'

import { adminReportsKeys } from './useAdminReportsQueries'

export const useResolveReport = ({
	report,
	onSuccess
}: {
	report: IReport
	onSuccess?: () => void
}) => {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const form = useForm<ResolveReportFormValues>({
		resolver: zodResolver(ResolveReportFormSchema),
		defaultValues: {
			decision: 'RESOLVE_NONE',
			resolutionNote: '',
			banReason: report.reason,
			banDuration: 24,
			banUnit: BanDurationUnit.HOURS
		}
	})

	const { mutate, isPending } = useMutation<
		IReport,
		AxiosError,
		ResolveReportPayload
	>({
		mutationKey: ['resolve-report', report.id],
		mutationFn: data => resolveAdminReport(report.id, data),
		onSuccess: () => {
			toast.success(t('admin.reports.actions.resolved'))
			queryClient.invalidateQueries({ queryKey: adminReportsKeys.all() })
			form.reset()
			onSuccess?.()
		},
		onError: err => handleApiError(err, t)
	})

	const onSubmit: SubmitHandler<ResolveReportFormValues> = data =>
		mutate(mapToPayload(ResolveReportFormSchema.parse(data)))

	return {
		form,
		isPending,
		onSubmit
	}
}
