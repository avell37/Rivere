export interface IMessage {
	id: string
	text: string
	user: {
		avatar: string | null
		nickname: string
	}
	userId: string
	createdAt: string
	updatedAt: string
}
