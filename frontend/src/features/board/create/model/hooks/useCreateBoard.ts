'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { createBoard } from '@/entities/Board/model/api/boardApi'

import { handleApiError } from '@/shared/utils/handleApiError'

import {
	CreateBoardRequest,
	CreateBoardSchema
} from '../validation/create-board.z.validation'

export const useCreateBoard = () => {
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

	const { mutate } = useMutation({
		mutationKey: ['create board'],
		mutationFn: (data: CreateBoardRequest) => createBoard(data),
		onSuccess: () => {
			form.reset()
			toast.success('Доска успешно создана.')
			queryClient.invalidateQueries({ queryKey: ['get boards'] })
		},
		onError: handleApiError
	})

	const onSubmit: SubmitHandler<CreateBoardRequest> = data => mutate(data)

	return {
		form,
		onSubmit
	}
}
