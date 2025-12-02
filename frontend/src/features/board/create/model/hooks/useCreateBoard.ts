'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { createBoard } from '@/entities/Board/model/api/boardApi'

import {
	CreateBoardRequest,
	CreateBoardSchema
} from '../validation/create-board.z.validation'

export const useCreateBoard = () => {
	const form = useForm<CreateBoardRequest>({
		resolver: zodResolver(CreateBoardSchema),
		defaultValues: {
			title: '',
			background: ''
		}
	})

	const { mutate } = useMutation({
		mutationKey: ['create board'],
		mutationFn: (data: CreateBoardRequest) => createBoard(data),
		onSuccess: () => {
			form.reset()
			toast.success('Доска успешно создана.')
		},
		onError(err) {
			if (err.message) {
				toast.error(err.message)
			} else {
				toast.error('Ошибка при создании доски.')
			}
		}
	})

	const onSubmit: SubmitHandler<CreateBoardRequest> = data => mutate(data)

	return {
		form,
		onSubmit
	}
}
