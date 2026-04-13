import { MouseEvent } from 'react'

import { useToggleFavorite } from './useBoardQueries'

export const useToggleFavoriteBoard = (
	boardId: string,
	isFavorite: boolean | undefined
) => {
	const { mutate, isPending } = useToggleFavorite(boardId, isFavorite)

	const handleToggleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.stopPropagation()

		mutate()
	}

	return {
		isPending,
		handleToggleFavorite
	}
}
