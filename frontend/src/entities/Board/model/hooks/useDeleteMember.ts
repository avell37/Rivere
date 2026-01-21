import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteMember } from '../api/boardApi'

export const useDeleteMember = (boardId: string) => {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation<boolean, unknown, string>({
		mutationKey: ['delete member'],
		mutationFn: (userId: string) => deleteMember(boardId, userId),
		onSuccess: () => {
			toast.success('Успешно')
			queryClient.invalidateQueries({
				queryKey: ['get board', boardId]
			})
		}
	})

	return {
		mutate,
		isPending
	}
}
