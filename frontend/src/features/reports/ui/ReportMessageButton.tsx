'use client'

import { useTranslations } from 'next-intl'

import { IMessage } from '@/entities/Chat'

import { ReportButton } from './ReportButton'

export const ReportMessageButton = ({
	message,
	currentUserId
}: {
	message: IMessage
	currentUserId: string
}) => {
	const t = useTranslations('reports.message')

	return (
		<ReportButton
			targetType='MESSAGE'
			targetId={message.id}
			formNamespace='message'
			hidden={message.userId === currentUserId}
			description={t('description', {
				author: message.user.nickname
			})}
		/>
	)
}
