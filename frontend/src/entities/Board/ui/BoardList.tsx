'use client'

import { CreateBoardModal } from '@/features/board/create/ui/CreateBoardModal'

import { IBoard } from '../model/types/IBoard'

import { BoardItem } from './BoardItem'

export const BoardList = ({ boards }: { boards: IBoard[] }) => {
	return (
		<div className='flex flex-wrap gap-4'>
			{boards?.map((board: IBoard) => (
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
