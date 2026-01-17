'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { deleteBoard } from '@/entities/Board'

import { PUBLIC_URL } from '@/shared/libs'
import { handleApiError } from '@/shared/utils'

export const useDeleteBoard = (boardId: string) => {
	const queryClient = useQueryClient()
	const router = useRouter()
	const t = useTranslations()

	const { mutate } = useMutation<boolean, unknown>({
		mutationKey: ['delete board'],
		mutationFn: () => deleteBoard(boardId),
		onSuccess: () => {
			router.push(PUBLIC_URL.boards())
			queryClient.invalidateQueries({ queryKey: ['get boards'] })
			toast.success(t('board.delete.deleteSuccess'))
		},
		onError: err => handleApiError(err, t)
	})

	const onSubmit = () => mutate()

	return { onSubmit }
}
