'use client'

import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

import { IReport } from '@/features/reports'

import {
	FormInputController,
	FormSelectController,
	FormTextareaController
} from '@/shared/ui/custom'
import { Button, Form } from '@/shared/ui/external'

import { banDurationOptions } from '../../users/model/lib/banOptionts'
import { ResolveReportFormProps } from '../model/types/ResolveReportProps'
import { ResolveReportDecision } from '../model/validation/resolve-report.z.validation'

const canBanUser = (report: IReport) =>
	Boolean(
		report.reportedUser &&
		report.reportedUser.role !== 'ADMIN' &&
		report.reportedUser.role !== 'CREATOR'
	)

export const ResolveReportForm = ({
	report,
	form,
	isPending,
	onSubmit,
	onCancel
}: ResolveReportFormProps) => {
	const t = useTranslations('admin.reports.resolve')
	const tBan = useTranslations('admin.users.banModal')
	const decision = form.watch('decision')

	const decisionOptions = useMemo(() => {
		const options: { value: ResolveReportDecision; label: string }[] = [
			{ value: 'RESOLVE_NONE', label: t('decisions.resolveNone') },
			{ value: 'DISMISS', label: t('decisions.dismiss') }
		]

		if (canBanUser(report)) {
			options.push({
				value: 'BAN_USER',
				label: t('decisions.banUser')
			})
		}

		if (report.targetType === 'MESSAGE') {
			options.push({
				value: 'DELETE_MESSAGE',
				label: t('decisions.deleteMessage')
			})
		}

		return options
	}, [report, t])

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-4'
			>
				<FormSelectController
					name='decision'
					label={t('decisionLabel')}
					placeholder={t('decisionPlaceholder')}
					control={form.control}
					options={decisionOptions}
					disabled={isPending}
				/>

				<FormTextareaController
					name='resolutionNote'
					label={t('noteLabel')}
					placeholder={t('notePlaceholder')}
					control={form.control}
					disabled={isPending}
				/>

				{decision === 'BAN_USER' && (
					<div className='space-y-4 rounded-lg border p-4'>
						<p className='text-sm text-muted-foreground'>
							{t('banSection', {
								username: report.reportedUser?.username ?? ''
							})}
						</p>
						<FormInputController
							name='banReason'
							label={tBan('banReasonLabel')}
							placeholder={tBan('banReasonPlaceholder')}
							control={form.control}
							disabled={isPending}
						/>
						<div className='flex items-end gap-2'>
							<FormInputController
								name='banDuration'
								label={tBan('durationLabel')}
								placeholder={tBan('durationPlaceholder')}
								className='flex-1 w-full'
								control={form.control}
								disabled={isPending}
							/>
							<FormSelectController
								name='banUnit'
								className='flex-1 w-full'
								control={form.control}
								options={banDurationOptions(tBan)}
								disabled={isPending}
							/>
						</div>
					</div>
				)}

				{decision === 'DELETE_MESSAGE' && (
					<p className='rounded-md bg-muted/40 p-3 text-sm text-muted-foreground'>
						{t('deleteMessageHint')}
					</p>
				)}

				<div className='flex justify-end gap-2'>
					<Button
						type='button'
						variant='ghost'
						onClick={onCancel}
						disabled={isPending}
					>
						{t('cancel')}
					</Button>
					<Button type='submit' disabled={isPending}>
						{isPending ? t('submitting') : t('submit')}
					</Button>
				</div>
			</form>
		</Form>
	)
}
