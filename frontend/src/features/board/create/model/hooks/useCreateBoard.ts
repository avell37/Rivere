'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	CreateBoardRequest,
	CreateBoardSchema,
	IBoard,
	boardKeys,
	createBoard
} from '@/entities/Board'

import { handleApiError } from '@/shared/utils'

export const useCreateBoard = ({ onSuccess }: { onSuccess: () => void }) => {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const form = useForm<CreateBoardRequest>({
		resolver: zodResolver(CreateBoardSchema),
		defaultValues: {
			title: '',
			background: {
				color: null,
				url: null
			}
		}
	})

	const { mutate, isPending } = useMutation<
		IBoard,
		unknown,
		CreateBoardRequest
	>({
		mutationKey: ['create board'],
		mutationFn: (data: CreateBoardRequest) => createBoard(data),
		onSuccess: () => {
			form.reset()
			queryClient.invalidateQueries({ queryKey: boardKeys.all })
			toast.success(t('board.create.createSuccess'))
			onSuccess()
		},
		onError: err => handleApiError(err, t)
	})

	const onSubmit: SubmitHandler<CreateBoardRequest> = data => mutate(data)

	return {
		form,
		isPending,
		onSubmit
	}
}
