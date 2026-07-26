'use client'

import { useLocale, useTranslations } from 'next-intl'

import { formatDateTime } from '@/shared/utils'

import { IAdminAuditLog } from '../model/types/AdminAuditTypes'

export const AdminAuditItem = ({ log }: { log: IAdminAuditLog }) => {
	const t = useTranslations('admin.audit')
	const locale = useLocale()

	return (
		<div className='rounded-xl border bg-card p-4'>
			<div className='flex flex-wrap items-start justify-between gap-3'>
				<div className='flex flex-col gap-1'>
					<p className='font-medium'>{t(`actions.${log.action}`)}</p>
					<p className='text-sm text-muted-foreground'>
						{t('adminLabel', {
							username: log.admin.username,
							nickname: log.admin.nickname
						})}
					</p>
				</div>
				<span className='text-xs text-muted-foreground'>
					{formatDateTime(log.createdAt, locale)}
				</span>
			</div>
			{(log.targetType || log.targetId) && (
				<p className='mt-2 text-sm text-muted-foreground'>
					{t('target', {
						type: log.targetType ?? '-',
						id: log.targetId ?? '-'
					})}
				</p>
			)}
			{log.metadata && Object.keys(log.metadata).length > 0 && (
				<pre className='mt-3 overflow-x-auto rounded-md bg-muted/60 p-3 text-xs whitespace-pre-wrap break-all'>
					{JSON.stringify(log.metadata, null, 2)}
				</pre>
			)}
		</div>
	)
}
