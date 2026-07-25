'use client'

import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import {
	AdminAuditAction,
	AdminAuditFilters,
	AdminAuditItem,
	AdminAuditResponse
} from '@/features/admin'

import { ADMIN_URL } from '@/shared/libs'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/ui/external'
import { AUDIT_ACTIONS } from '@/shared/utils/admin.utilts'

import { AdminListLayout } from '../ui/AdminListLayout'

export const AdminAuditList = ({
	data,
	filters
}: {
	data: AdminAuditResponse
	filters: AdminAuditFilters
}) => {
	const t = useTranslations('admin.audit')
	const router = useRouter()

	const updateAction = (action: AdminAuditAction | 'all') => {
		router.push(
			ADMIN_URL.adminAudit(1, action === 'all' ? undefined : action)
		)
	}

	return (
		<AdminListLayout
			heading={t('heading')}
			isEmpty={data.items.length === 0}
			emptyText={t('empty')}
			page={data.page}
			totalPages={data.totalPages}
			buildPageHref={page =>
				ADMIN_URL.adminAudit(
					page,
					filters.action === 'all' ? undefined : filters.action
				)
			}
			filter={
				<Select
					value={filters.action ?? 'all'}
					onValueChange={value =>
						updateAction(value as AdminAuditAction | 'all')
					}
				>
					<SelectTrigger className='w-[220px]'>
						<SelectValue placeholder={t('filters.action')} />
					</SelectTrigger>
					<SelectContent>
						{AUDIT_ACTIONS.map(action => (
							<SelectItem key={action} value={action}>
								{action === 'all'
									? t('filters.all')
									: t(`actions.${action}`)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			}
		>
			{data.items.map(log => (
				<AdminAuditItem key={log.id} log={log} />
			))}
		</AdminListLayout>
	)
}
