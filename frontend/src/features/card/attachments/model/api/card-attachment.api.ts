import { authAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'

import { CardAttachment } from '../types/CardAttachmentProprs'

export const listAttachments = async (cardId: string) => {
	const response = await authAxios.get<CardAttachment[]>(
		`${API_URL.cards()}${cardId}/attachments`
	)
	return response.data
}

export const uploadAttachment = async ({
	cardId,
	file
}: {
	cardId: string
	file: File
}) => {
	const formData = new FormData()
	formData.append('file', file)

	const response = await authAxios.post<CardAttachment>(
		`${API_URL.cards()}${cardId}/attachments`,
		formData,
		{ headers: { 'Content-Type': 'multipart/form-data' } }
	)

	return response.data
}

export const deleteAttachment = async ({
	cardId,
	attachmentId
}: {
	cardId: string
	attachmentId: string
}) => {
	await authAxios.delete(
		`${API_URL.cards()}${cardId}/attachments/${attachmentId}`
	)
}
