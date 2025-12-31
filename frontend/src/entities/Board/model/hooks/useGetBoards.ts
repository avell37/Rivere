import { useQuery } from '@tanstack/react-query'

import { fetchUserBoards } from '../api/boardApi'

export const useGetBoards = () => {
	const { data: boards, isPending } = useQuery({
		queryKey: ['get boards'],
		queryFn: fetchUserBoards
	})

	return {
		boards,
		isPending
	}
}
