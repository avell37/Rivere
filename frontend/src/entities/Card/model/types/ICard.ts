export interface ICard {
	id: string
	title: string
	description?: string
	position: number
	priority: string
	deadline: Date
	columnId: string
	createdAt?: Date
	updatedAt?: Date
}
