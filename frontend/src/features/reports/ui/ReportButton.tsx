'use client'

import { Flag } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Modal } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

import { useCreateReport } from '../model/hooks/useCreateReport'
import { ReportButtonProps } from '../model/types/ReportTypes'

import { ReportMessageForm } from './ReportMessageForm'

export const ReportButton = ({
	targetType,
	targetId,
	description,
	formNamespace,
	triggerClassName,
	hidden
}: ReportButtonProps) => {
	const t = useTranslations(`reports.${formNamespace}`)
	const { open, form, isPending, onSubmit, setOpen } = useCreateReport({
		targetType,
		targetId
	})

	if (hidden) return null

	return (
		<Modal
			open={open}
			onOpenChange={setOpen}
			trigger={
				<Button
					type='button'
					variant='ghost'
					size='icon'
					className={
						triggerClassName ??
						'size-7 shrink-0 text-muted-foreground'
					}
					onClick={e => e.stopPropagation()}
				>
					<Flag size={14} />
				</Button>
			}
			title={t('title')}
			contentClassname='max-w-md'
		>
			<ReportMessageForm
				form={form}
				isPending={isPending}
				onSubmit={onSubmit}
				onCancel={() => setOpen(false)}
				t={t}
				description={description}
			/>
		</Modal>
	)
}
