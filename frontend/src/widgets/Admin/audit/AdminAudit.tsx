'use client'

import { useTranslations } from 'next-intl'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { useGetUser } from '@/entities/User'
import { parseAuditFilters, useGetAdminAuditLogs } from '@/features/admin'

import { ADMIN_URL } from '@/shared/libs'

import { AdminPageShell } from '../ui/AdminPageShell'

import { AdminAuditList } from './AdminAuditList'

export const AdminAudit = () => {
	const t = useTranslations('admin.audit')
	const router = useRouter()
	const searchParams = useSearchParams()
	const filters = parseAuditFilters(searchParams)
	const { data: user, isLoading: isUserLoading } = useGetUser()
	const canAccess = !isUserLoading && user?.role === 'CREATOR'
	const { data, isLoading } = useGetAdminAuditLogs(filters, canAccess)

	useEffect(() => {
		if (!isUserLoading && user && user.role !== 'CREATOR') {
			router.replace(ADMIN_URL.admin())
		}
	}, [isUserLoading, user, router])

	if (isUserLoading || !user || user.role !== 'CREATOR') {
		return null
	}

	return (
		<AdminPageShell
			isLoading={isLoading || !data}
			loadingText={t('loading')}
		>
			<AdminAuditList data={data!} filters={filters} />
		</AdminPageShell>
	)
}
