export interface IMessage {
	id: string
	text: string
	deletedAt?: string | null
	user: {
		avatar: string | null
		nickname: string
	}
	userId: string
	createdAt: string
	updatedAt: string
}
