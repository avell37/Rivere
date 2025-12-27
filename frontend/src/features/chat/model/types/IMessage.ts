export interface IMessage {
	id: string
	text: string
	user: {
		avatar: string | null
		nickname: string | null
	}
	userId: string
	chatId: string
	createdAt: Date
	updatedAt: Date
}
