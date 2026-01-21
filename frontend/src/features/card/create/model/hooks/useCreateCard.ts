'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ICard, createCard } from '@/entities/Card'

import { handleApiError } from '@/shared/utils'

import { CreateCardProps } from '../types/CreateCardProps'
import {
	CreateCardRequest,
	CreateCardSchema
} from '../validation/create-card.z.validation'

export const useCreateCard = ({
	columnId,
	boardId,
	onSuccess
}: CreateCardProps) => {
	const queryClient = useQueryClient()
	const t = useTranslations()
	const form = useForm<CreateCardRequest>({
		resolver: zodResolver(CreateCardSchema),
		defaultValues: {
			title: ''
		}
	})

	const { mutate } = useMutation<ICard, unknown, CreateCardRequest>({
		mutationKey: ['create card'],
		mutationFn: (data: CreateCardRequest) =>
			createCard({ columnId, ...data }),
		onSuccess: () => {
			form.reset()
			queryClient.invalidateQueries({ queryKey: ['get board', boardId] })
			toast.success(t('card.create.createSuccess'))
			onSuccess(false)
		},
		onError: err => handleApiError(err, t)
	})

	const onSubmit: SubmitHandler<CreateCardRequest> = data => mutate(data)

	return {
		form,
		onSubmit
	}
}
