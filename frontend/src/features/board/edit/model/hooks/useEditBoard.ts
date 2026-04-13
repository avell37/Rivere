'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	EditBoardRequest,
	EditBoardSchema,
	IBoard,
	boardKeys,
	updateBoard,
	useGetBoard
} from '@/entities/Board'

import { handleApiError } from '@/shared/utils'

export const useEditBoard = ({
	boardId,
	onSuccess
}: {
	boardId: string
	onSuccess: (open: boolean) => void
}) => {
	const { board } = useGetBoard(boardId)
	const queryClient = useQueryClient()
	const t = useTranslations()

	const form = useForm<EditBoardRequest>({
		resolver: zodResolver(EditBoardSchema),
		defaultValues: {
			title: '',
			background: {
				color: '',
				url: ''
			}
		}
	})

	useEffect(() => {
		if (!board) return

		form.reset({
			title: board.title,
			background: board.background
		})
	}, [board, form])

	const { mutate, isPending } = useMutation<
		IBoard,
		unknown,
		EditBoardRequest
	>({
		mutationKey: ['update board', boardId],
		mutationFn: (data: EditBoardRequest) => updateBoard({ boardId, data }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: boardKeys.single(boardId)
			})
			toast.success(t('board.edit.editSuccess'))
			onSuccess(false)
		},
		onError: err => handleApiError(err, t)
	})

	const onSubmit: SubmitHandler<EditBoardRequest> = data => mutate(data)

	return {
		form,
		isPending,
		onSubmit
	}
}
