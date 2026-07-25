'use client'

import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

import { parseFilters, useGetAdminReports } from '@/features/admin'

import { AdminPageShell } from '../ui/AdminPageShell'

import { ReportAdminList } from './ReportAdminList'

export const AdminReports = () => {
	const t = useTranslations('admin.reports')
	const searchParams = useSearchParams()
	const filters = parseFilters(searchParams)
	const { data, isLoading } = useGetAdminReports(filters)

	return (
		<AdminPageShell
			isLoading={isLoading || !data}
			loadingText={t('loading')}
		>
			<ReportAdminList data={data!} filters={filters} />
		</AdminPageShell>
	)
}
