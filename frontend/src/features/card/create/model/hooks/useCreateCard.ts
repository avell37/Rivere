'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	CreateCardRequest,
	CreateCardSchema,
	useCreateCardMutation
} from '@/entities/Card'

import { CreateCardProps } from '../types/CreateCardProps'

export const useCreateCard = ({
	columnId,
	boardId,
	onSuccess
}: CreateCardProps) => {
	const t = useTranslations()
	const { createCard, createCardPending } = useCreateCardMutation({
		columnId,
		boardId
	})

	const form = useForm<CreateCardRequest>({
		resolver: zodResolver(CreateCardSchema),
		defaultValues: {
			title: ''
		}
	})

	const onSubmit: SubmitHandler<CreateCardRequest> = data =>
		createCard(data, {
			onSuccess: () => {
				form.reset()
				toast.success(t('card.create.createSuccess'))
				onSuccess(false)
			}
		})

	return {
		form,
		createCardPending,
		onSubmit
	}
}
