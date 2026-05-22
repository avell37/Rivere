'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	EditBoardRequest,
	EditBoardSchema,
	useGetBoard,
	useUpdateBoardMutation
} from '@/entities/Board'

export const useEditBoard = ({
	boardId,
	onSuccess
}: {
	boardId: string
	onSuccess: (open: boolean) => void
}) => {
	const { board } = useGetBoard(boardId)
	const t = useTranslations()
	const { updateBoard, updateBoardPending } = useUpdateBoardMutation(boardId)

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

	const onSubmit: SubmitHandler<EditBoardRequest> = data =>
		updateBoard(data, {
			onSuccess: () => {
				toast.success(t('board.edit.editSuccess'))
				onSuccess(false)
			}
		})

	return {
		form,
		updateBoardPending,
		onSubmit
	}
}
