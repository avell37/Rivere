'use client'

import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'

import { parseAuditFilters, useGetAdminAuditLogs } from '@/features/admin'

import { AdminPageShell } from '../ui/AdminPageShell'

import { AdminAuditList } from './AdminAuditList'

export const AdminAudit = () => {
	const t = useTranslations('admin.audit')
	const searchParams = useSearchParams()
	const filters = parseAuditFilters(searchParams)
	const { data, isLoading } = useGetAdminAuditLogs(filters)

	return (
		<AdminPageShell
			isLoading={isLoading || !data}
			loadingText={t('loading')}
		>
			<AdminAuditList data={data!} filters={filters} />
		</AdminPageShell>
	)
}
