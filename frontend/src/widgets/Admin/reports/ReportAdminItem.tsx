'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { IReport, ResolveReportModal, statusVariant } from '@/features/admin'

import { ADMIN_URL } from '@/shared/libs'
import { Badge } from '@/shared/ui/external'

export const ReportAdminItem = ({ report }: { report: IReport }) => {
	const t = useTranslations('admin.reports')

	const snapshot = report.snapshot as {
		messageText?: string
		cardTitle?: string
		author?: { username?: string; nickname?: string }
	} | null

	return (
		<article className='rounded-xl border bg-card p-4 space-y-3'>
			<div className='flex flex-wrap items-start justify-between gap-3'>
				<div className='space-y-1'>
					<div className='flex items-center gap-2'>
						<Badge variant={statusVariant[report.status]}>
							{t(`status.${report.status}`)}
						</Badge>

						<span className='text-sm font-medium'>
							{t(`targetType.${report.targetType}`)}
						</span>
					</div>

					<p className='text-xs text-muted-foreground'>
						{new Date(report.createdAt).toLocaleString()}
					</p>
				</div>

				{report.status === 'OPEN' && (
					<ResolveReportModal report={report} />
				)}
			</div>

			<div className='grid gap-2 text-sm'>
				<p>
					<span className='text-muted-foreground'>
						{t('fields.reason')}:{' '}
					</span>

					{report.reason}
				</p>

				{report.details && (
					<p>
						<span className='text-muted-foreground'>
							{t('fields.details')}:{' '}
						</span>

						{report.details}
					</p>
				)}

				<p>
					<span className='text-muted-foreground'>
						{t('fields.reporter')}:{' '}
					</span>
					{report.reporter.username} ({report.reporter.email})
				</p>

				{report.reportedUser && (
					<p>
						<span className='text-muted-foreground'>
							{t('fields.reportedUser')}:{' '}
						</span>

						<Link
							href={ADMIN_URL.adminUsers({
								page: 1,
								search: report.reportedUser.email
							})}
							className='underline underline-offset-4'
						>
							{report.reportedUser.username}
						</Link>
					</p>
				)}

				{snapshot?.messageText && (
					<p className='rounded-md bg-muted/40 p-3 min-w-0 max-w-full text-sm break-all whitespace-pre-wrap'>
						{snapshot.messageText}
					</p>
				)}

				{snapshot?.cardTitle && (
					<p className='text-muted-foreground'>
						{t('fields.card')}: {snapshot.cardTitle}
					</p>
				)}
			</div>

			{report.status !== 'OPEN' && report.resolvedAt && (
				<div className='rounded-md border bg-muted/20 p-3 text-sm space-y-1'>
					<p>
						<span className='text-muted-foreground'>
							{t('fields.resolvedBy')}:{' '}
						</span>

						{report.resolvedBy?.username ?? '—'}

						{' · '}

						{new Date(report.resolvedAt).toLocaleString()}
					</p>

					{report.resolutionAction && (
						<p>
							<span className='text-muted-foreground'>
								{t('fields.action')}:{' '}
							</span>

							{t(`resolutionAction.${report.resolutionAction}`)}
						</p>
					)}

					{report.resolutionNote && (
						<p>
							<span className='text-muted-foreground'>
								{t('fields.resolutionNote')}:{' '}
							</span>

							{report.resolutionNote}
						</p>
					)}
				</div>
			)}
		</article>
	)
}
