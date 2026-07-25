'use client'

import { useTranslations } from 'next-intl'

import {
	BanDurationFields,
	FormSelectController,
	FormTextareaController
} from '@/shared/ui/custom'
import { Button, Form } from '@/shared/ui/external'

import { useResolveReportForm } from '../model/hooks/useResolveReportForm'
import { ResolveReportFormProps } from '../model/types/ResolveReportProps'

export const ResolveReportForm = ({
	report,
	form,
	isPending,
	onSubmit,
	onCancel
}: ResolveReportFormProps) => {
	const t = useTranslations('admin.reports.resolve')
	const { tBan, decisionOptions, decision } = useResolveReportForm({
		report,
		form
	})

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
						<BanDurationFields
							control={form.control}
							disabled={isPending}
							t={tBan}
							reasonName='banReason'
							durationName='banDuration'
							unitName='banUnit'
						/>
					</div>
				)}

				{decision === 'DELETE_MESSAGE' && (
					<p className='rounded-md bg-muted/40 p-3 text-sm text-muted-foreground'>
						{t('deleteMessageHint')}
					</p>
				)}

				{decision === 'DELETE_CARD' && (
					<p className='rounded-md bg-muted/40 p-3 text-sm text-muted-foreground'>
						{t('deleteCardHint')}
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
