'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import {
	AdminReportsFilters,
	ReportStatus,
	ReportsResponse
} from '@/features/admin'

import { ADMIN_URL } from '@/shared/libs'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/ui/external'

import { AdminListLayout } from '../ui/AdminListLayout'

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
		<AdminListLayout
			heading={t('heading')}
			isEmpty={data.reports.length === 0}
			emptyText={t('empty')}
			page={data.page}
			totalPages={data.totalPages}
			buildPageHref={page =>
				ADMIN_URL.adminReports(
					page,
					filters.status === 'all' ? undefined : filters.status
				)
			}
			filter={
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
			}
		>
			{data.reports.map(report => (
				<ReportAdminItem key={report.id} report={report} />
			))}
		</AdminListLayout>
	)
}
