import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { fetchBoardById } from '../api/boardApi'
import { IBoard } from '../types/IBoard'

export const useGetBoard = (boardId: string) => {
	const {
		data: board,
		isLoading,
		error
	} = useQuery<IBoard, AxiosError>({
		queryKey: ['get board', boardId],
		queryFn: () => fetchBoardById(boardId),
		enabled: !!boardId,
		retry: false
	})

	const backgroundStyle: React.CSSProperties = {}

	if (board?.background) {
		const { url, color } = board.background

		if (url) {
			backgroundStyle.backgroundImage = `url(${url})`
			backgroundStyle.backgroundSize = 'cover'
			backgroundStyle.backgroundPosition = 'center'
			backgroundStyle.backgroundRepeat = 'no-repeat'
		} else if (color) {
			if (color.includes('gradient')) {
				backgroundStyle.backgroundImage = color
				backgroundStyle.backgroundSize = 'cover'
				backgroundStyle.backgroundPosition = 'center'
			} else {
				backgroundStyle.backgroundColor = color
			}
		}
	}

	return {
		board,
		isLoading,
		error,
		backgroundStyle
	}
}
