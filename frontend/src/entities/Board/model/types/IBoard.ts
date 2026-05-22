import { IColumn } from '@/entities/Column'

import { BoardRole } from '@/shared/utils'

import { IBoardMember } from './IBoardMember'

export interface IBoard {
	id: string
	title: string
	columns: IColumn[]
	background: BoardBackground
	isFavorite: boolean
	currentUserRole: BoardRole
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

export interface BoardBackground {
	url: string | null
	color: string | null
}
