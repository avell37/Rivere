'use client'

import { IBoard } from '../model/types/IBoard'

import { BoardItem } from './BoardItem'

export const BoardList = ({ boards }: { boards: IBoard[] }) => {
	return (
		<div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4'>
			{boards?.map((board: IBoard) => (
				<div key={board.id}>
					<BoardItem
						id={board.id}
						title={board.title}
						members={board.members.length}
						background={board.background}
						isFavorite={board.isFavorite}
					/>
				</div>
			))}
		</div>
	)
}
