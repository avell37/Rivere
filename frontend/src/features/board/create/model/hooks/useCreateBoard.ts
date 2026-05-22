'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	CreateBoardRequest,
	CreateBoardSchema,
	useCreateBoardMutation
} from '@/entities/Board'

export const useCreateBoard = ({ onSuccess }: { onSuccess: () => void }) => {
	const t = useTranslations()
	const { createBoard, createBoardPending } = useCreateBoardMutation()

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

	const onSubmit: SubmitHandler<CreateBoardRequest> = data =>
		createBoard(data, {
			onSuccess: () => {
				form.reset()
				onSuccess()
				toast.success(t('board.create.createSuccess'))
			}
		})

	return {
		form,
		createBoardPending,
		onSubmit
	}
}
