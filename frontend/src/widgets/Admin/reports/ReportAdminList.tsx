'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import {
	AdminReportsFilters,
	ReportStatus,
	ReportsResponse
} from '@/features/admin'

import { ADMIN_URL } from '@/shared/libs'
import { CustomPagination } from '@/shared/ui/custom'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/ui/external'

import { ReportAdminItem } from './ReportAdminItem'

export const ReportAdminList = ({
	data,
	filters
}: {
	data: ReportsResponse
	filters: AdminReportsFilters
}) => {
	const t = useTranslations('admin.reports')
	const router = useRouter()

	const updateStatus = (status: ReportStatus | 'all') => {
		router.push(
			ADMIN_URL.adminReports(1, status === 'all' ? undefined : status)
		)
	}

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex items-center justify-between gap-3'>
				<h1 className='text-xl font-semibold'>{t('heading')}</h1>
				<Select
					value={filters.status ?? 'all'}
					onValueChange={value =>
						updateStatus(value as ReportStatus | 'all')
					}
				>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder={t('filters.status')} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>{t('filters.all')}</SelectItem>
						<SelectItem value='OPEN'>{t('status.OPEN')}</SelectItem>
						<SelectItem value='RESOLVED'>
							{t('status.RESOLVED')}
						</SelectItem>
						<SelectItem value='DISMISSED'>
							{t('status.DISMISSED')}
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className='flex flex-col gap-3'>
				{data.reports.length === 0 ? (
					<div className='rounded-xl border bg-card p-6 text-center text-sm text-muted-foreground'>
						{t('empty')}
					</div>
				) : (
					data.reports.map(report => (
						<ReportAdminItem key={report.id} report={report} />
					))
				)}
			</div>

			<CustomPagination
				page={data.page}
				totalPages={data.totalPages}
				buildPageHref={page => {
					const params = new URLSearchParams()
					params.set('page', String(page))
					if (filters.status && filters.status !== 'all') {
						params.set('status', filters.status)
					}
					return `?${params.toString()}`
				}}
			/>
		</div>
	)
}
