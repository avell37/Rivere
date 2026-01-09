import { useQuery } from '@tanstack/react-query'

import { fetchUserBoards } from '../api/boardApi'
import { IBoard } from '../types/IBoard'

export const useGetBoards = () => {
	const { data: boards, isPending } = useQuery<IBoard[]>({
		queryKey: ['get boards'],
		queryFn: fetchUserBoards
	})

	return {
		boards,
		isPending
	}
}
