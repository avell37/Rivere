'use client'

import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

import { parseFilters, useGetAdminReports } from '@/features/admin'

import { NavBar } from '@/shared/ui/custom'

import { ReportAdminList } from './ReportAdminList'

export const AdminReports = () => {
	const t = useTranslations('admin.reports')
	const searchParams = useSearchParams()
	const filters = parseFilters(searchParams)
	const { data, isLoading } = useGetAdminReports(filters)

	return (
		<div className='container mx-auto flex flex-col gap-6 pb-10'>
			<NavBar />
			{isLoading || !data ? (
				<div className='rounded-xl border bg-card p-6 text-sm text-muted-foreground'>
					{t('loading')}
				</div>
			) : (
				<ReportAdminList data={data} filters={filters} />
			)}
		</div>
	)
}
