'use client'

import { CreateBoardModal } from '@/features/board/create/ui/CreateBoardModal'

import { useGetBoards } from '../model/hooks/useGetBoards'
import { IBoard } from '../model/types/IBoard'

import { BoardItem } from './BoardItem'

export const BoardList = () => {
	const { boards, isPending } = useGetBoards()

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
