import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

import { IReport } from '@/features/reports'

import { UseResolveReportFormProps } from '../types/ResolveReportProps'
import { ResolveReportDecision } from '../validation/resolve-report.z.validation'

export const useResolveReportForm = ({
	report,
	form
}: UseResolveReportFormProps) => {
	const t = useTranslations('admin.reports.resolve')
	const tBan = useTranslations('admin.users.banModal')
	const decision = form.watch('decision')

	const canBanUser = (report: IReport) =>
		Boolean(
			report.reportedUser &&
			report.reportedUser.role !== 'ADMIN' &&
			report.reportedUser.role !== 'CREATOR'
		)

	const decisionOptions = useMemo(() => {
		const options: { value: ResolveReportDecision; label: string }[] = [
			{ value: 'RESOLVE_NONE', label: t('decisions.resolveNone') },
			{ value: 'DISMISS', label: t('decisions.dismiss') }
		]

		if (canBanUser(report)) {
			options.push({
				value: 'BAN_USER',
				label: t('decisions.banUser')
			})
		}

		if (report.targetType === 'MESSAGE') {
			options.push({
				value: 'DELETE_MESSAGE',
				label: t('decisions.deleteMessage')
			})
		}

		if (report.targetType === 'CARD') {
			options.push({
				value: 'DELETE_CARD',
				label: t('decisions.deleteCard')
			})
		}

		return options
	}, [report, t])

	return {
		tBan,
		decisionOptions,
		decision
	}
}
