'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

import { ICard, UpdateCardPayload, updateCard } from '@/entities/Card'

import { handleApiError } from '@/shared/utils'

import { EditableKey, EditableValue } from '../types/EditableProps'

export const useUpdateCard = (cardId: string, key: EditableKey) => {
	const t = useTranslations()
	const queryClient = useQueryClient()
	const [isEditing, setIsEditing] = useState(false)
	const { getValues } = useFormContext()
	const previousValueRef = useRef<EditableValue | null>(null)

	const mutation = useMutation<ICard, unknown, UpdateCardPayload>({
		mutationFn: (data: UpdateCardPayload) => updateCard(cardId, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['card'] })
			toast.success(t('card.edit.editSuccess'))
		},
		onError: err => handleApiError(err, t)
	})

	useEffect(() => {
		if (isEditing) {
			previousValueRef.current = getValues(key) as EditableValue
		}
	}, [isEditing, getValues])

	const handleBlur = (value: EditableValue) => {
		setIsEditing(false)
		if (value !== previousValueRef.current) {
			mutation.mutate({ [key]: value } as UpdateCardPayload)
		}
	}

	const handleChange = (value: EditableValue) => {
		mutation.mutate({ [key]: value } as UpdateCardPayload)
	}

	return {
		isEditing,
		isLoading: mutation.isPending,
		setIsEditing,
		handleBlur,
		handleChange
	}
}
