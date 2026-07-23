'use client'

import { FormTextareaController } from '@/shared/ui/custom'
import { Button, Form } from '@/shared/ui/external'

import { CreateReportFormProps } from '../model/types/CreateReportFormProps'

export const ReportMessageForm = ({
	form,
	isPending,
	onSubmit,
	onCancel,
	t,
	description
}: CreateReportFormProps) => {
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-4'
			>
				<p className='text-sm text-muted-foreground'>{description}</p>
				<FormTextareaController
					name='reason'
					label={t('reasonLabel')}
					placeholder={t('reasonPlaceholder')}
					control={form.control}
					disabled={isPending}
				/>
				<FormTextareaController
					name='details'
					label={t('detailsLabel')}
					placeholder={t('detailsPlaceholder')}
					control={form.control}
					disabled={isPending}
				/>
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
