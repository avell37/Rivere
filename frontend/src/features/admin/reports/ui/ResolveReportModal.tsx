'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { IReport } from '@/features/reports'

import { Modal } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

import { BanDurationUnit } from '../../users/model/types/AdminUserTypes'
import { useResolveReport } from '../model/hooks/useResolveReport'

import { ResolveReportForm } from './ResolveReportForm'

export const ResolveReportModal = ({ report }: { report: IReport }) => {
	const t = useTranslations('admin.reports.resolve')
	const [open, setOpen] = useState(false)
	const { form, isPending, onSubmit } = useResolveReport({
		report,
		onSuccess: () => setOpen(false)
	})

	const handleOpenChange = (nextOpen: boolean) => {
		setOpen(nextOpen)

		if (nextOpen) {
			form.reset({
				decision: 'RESOLVE_NONE',
				resolutionNote: '',
				banReason: report.reason,
				banDuration: 24,
				banUnit: BanDurationUnit.HOURS
			})
			return
		}

		form.reset()
	}

	return (
		<Modal
			open={open}
			onOpenChange={handleOpenChange}
			trigger={
				<Button size='sm' type='button'>
					{t('trigger')}
				</Button>
			}
			title={t('title')}
			contentClassname='max-w-lg'
		>
			<ResolveReportForm
				report={report}
				form={form}
				isPending={isPending}
				onSubmit={onSubmit}
				onCancel={() => handleOpenChange(false)}
			/>
		</Modal>
	)
}
