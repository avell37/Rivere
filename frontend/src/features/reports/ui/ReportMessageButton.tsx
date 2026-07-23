'use client'

import { Flag } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { IMessage } from '@/entities/Chat'

import { Modal } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

import { useCreateReport } from '../model/hooks/useCreateReport'

import { ReportMessageForm } from './ReportMessageForm'

export const ReportMessageButton = ({
	message,
	currentUserId
}: {
	message: IMessage
	currentUserId: string
}) => {
	const t = useTranslations('reports.message')
	const { open, form, isPending, onSubmit, setOpen } = useCreateReport({
		message
	})

	if (message.userId === currentUserId) return null

	return (
		<Modal
			open={open}
			onOpenChange={setOpen}
			trigger={
				<Button
					type='button'
					variant='ghost'
					size='icon'
					className='size-7 shrink-0 text-muted-foreground'
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
				description={t('description', {
					author: message.user.nickname
				})}
			/>
		</Modal>
	)
}
