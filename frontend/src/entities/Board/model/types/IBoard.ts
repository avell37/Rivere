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
	members: IBoardMember[]
	createdAt?: Date
	updatedAt?: Date
}
