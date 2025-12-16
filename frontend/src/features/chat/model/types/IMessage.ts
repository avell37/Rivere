export interface IMessage {
	id: string
	text: string
	user: {
		avatar: string | null
		displayUsername: string | null
	}
	userId: string
	chatId: string
	createdAt: Date
	updatedAt: Date
}
