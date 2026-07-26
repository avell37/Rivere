'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { handleApiError } from '@/shared/utils'

import {
	deleteAttachment,
	listAttachments,
	uploadAttachment
} from '../api/card-attachment.api'
import { CardAttachment } from '../types/CardAttachmentProprs'

const attachmentKeys = {
	list: (cardId: string) => ['card-attachments', cardId] as const
}

export const useCardAttachments = (cardId: string) => {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const query = useQuery({
		queryKey: attachmentKeys.list(cardId),
		queryFn: () => listAttachments(cardId),
		enabled: Boolean(cardId)
	})

	const uploadMutation = useMutation<CardAttachment, AxiosError, File>({
		mutationFn: file => uploadAttachment({ cardId, file }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: attachmentKeys.list(cardId)
			})
			toast.success(t('card.attachments.uploaded'))
		},
		onError: err => handleApiError(err, t)
	})

	const deleteMutation = useMutation<void, AxiosError, string>({
		mutationFn: attachmentId => deleteAttachment({ cardId, attachmentId }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: attachmentKeys.list(cardId)
			})
			toast.success(t('card.attachments.deleted'))
		},
		onError: err => handleApiError(err, t)
	})

	return {
		attachments: query.data ?? [],
		isLoading: query.isPending,
		isUploading: uploadMutation.isPending,
		isDeleting: deleteMutation.isPending,
		uploadAttachment: uploadMutation.mutate,
		deleteAttachment: deleteMutation.mutate
	}
}
