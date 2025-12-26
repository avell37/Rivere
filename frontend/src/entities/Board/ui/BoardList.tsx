'use client'
import { useQuery } from '@tanstack/react-query'

import { CreateBoardModal } from '@/features/board/create/ui/CreateBoardModal'

import { fetchUserBoards } from '../model/api/boardApi'
import { IBoard } from '../model/types/IBoard'

import { BoardItem } from './BoardItem'

export const BoardList = () => {
	const { data: boards, isPending } = useQuery({
		queryKey: ['boards'],
		queryFn: fetchUserBoards
	})

	return (
		<div className='flex flex-wrap gap-4'>
			{!isPending &&
				boards.map((board: IBoard) => (
					<div key={board.id}>
						<BoardItem
							id={board.id}
							title={board.title}
							members={board.members.length}
						/>
					</div>
				))}
			<CreateBoardModal />
		</div>
	)
}
