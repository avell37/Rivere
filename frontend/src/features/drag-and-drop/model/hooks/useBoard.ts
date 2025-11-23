import { useQuery } from '@tanstack/react-query'

import { fetchBoardById } from '@/entities/Board/model/api/boardApi'

export const useBoard = (id: string) => {
	return useQuery({
		queryKey: ['board', id],
		queryFn: () => fetchBoardById(id),
		enabled: !!id
	})
}
