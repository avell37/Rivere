import { IBoardMember } from './IBoardMember'

export interface BoardItemProps {
	id: string
	title: string
	members: number
}

export interface BoardMembersListProps {
	members: IBoardMember[]
}

export interface BoardMemberItemProps {
	member: IBoardMember
	joinedAtText: string
}
