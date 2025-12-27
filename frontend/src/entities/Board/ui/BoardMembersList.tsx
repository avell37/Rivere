import { IBoardMember } from '../model/types/IBoardMember'

import { BoardMemberItem } from './BoardMemberItem'

interface BoardMembersListProps {
	members: IBoardMember[]
}

export const BoardMembersList = ({ members }: BoardMembersListProps) => {
	console.log(members)
	return (
		<div className='flex flex-col gap-4'>
			<h1>Список участников доски:</h1>
			{members.map(member => (
				<BoardMemberItem key={member.id} member={member} />
			))}
		</div>
	)
}
