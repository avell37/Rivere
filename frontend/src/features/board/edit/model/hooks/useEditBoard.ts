import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { IBoard, updateBoard } from '@/entities/Board'

import { handleApiError } from '@/shared/utils'

import {
	EditBoardRequest,
	EditBoardSchema
} from '../validation/edit-board.z.validation'

export const useEditBoard = ({ boardId }: { boardId: string }) => {
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

	const { mutate, isPending } = useMutation<
		IBoard,
		unknown,
		EditBoardRequest
	>({
		mutationKey: ['update board', boardId],
		mutationFn: (data: EditBoardRequest) => updateBoard({ boardId, data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get board', boardId] })
			toast.success(t('board.edit.editSuccess'))
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
