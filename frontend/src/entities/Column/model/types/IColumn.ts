import { ICard } from '@/entities/Card'

export interface IColumn {
	id: string
	title: string
	position: number
	boardId: string
	cards: ICard[]
	createdAt?: Date
	updatedAt?: Date
}
