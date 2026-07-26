export type CardAttachment = {
	id: string
	key: string
	originalName: string
	mimeType: string
	size: number
	cardId: string
	createdAt: string
	uploadedBy: {
		id: string
		nickname: string
		username: string
	}
}
