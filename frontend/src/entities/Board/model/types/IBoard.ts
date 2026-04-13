import { IColumn } from '@/entities/Column'

import { IBoardMember } from './IBoardMember'

export interface IBoard {
	id: string
	title: string
	columns: IColumn[]
	background: {
		url: string | null
		color: string | null
	}
	isFavorite: boolean
	members: IBoardMember[]
	createdAt?: Date
	updatedAt?: Date
}

export interface IUserBoard {
	id: string
	boardId: string
	role: 'OWNER' | 'ADMIN' | 'MEMBER'
	isFavorite: boolean
	joinedAt: string
	createdAt: string
	updatedAt: string
}
