import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

import { updateCard } from '@/entities/Card/model/api/cardApi'
import { UpdateCardPayload } from '@/entities/Card/model/types/CardPayloads'

import { handleApiError } from '@/shared/utils/handleApiError'

type EditableKey = 'title' | 'description' | 'priority' | 'deadline'

export const useUpdateCard = (cardId: string, key: EditableKey) => {
	const t = useTranslations()
	const queryClient = useQueryClient()
	const [isEditing, setIsEditing] = useState(false)
	const { getValues } = useFormContext()
	const previousValueRef = useRef<string | null>(null)

	const mutation = useMutation({
		mutationFn: (data: UpdateCardPayload) => updateCard(cardId, data),
		onSuccess: () => {
			toast.success('Успешно')
			queryClient.invalidateQueries({ queryKey: ['card'] })
		},
		onError: err => handleApiError(err, t)
	})

	useEffect(() => {
		if (isEditing) previousValueRef.current = getValues(key)
	}, [isEditing, getValues])

	const handleBlur = (value: any) => {
		setIsEditing(false)
		if (value !== previousValueRef.current)
			mutation.mutate({ [key]: value })
	}

	const handleChange = (value: string) => mutation.mutate({ [key]: value })

	return {
		isEditing,
		isLoading: mutation.isPending,
		setIsEditing,
		handleBlur,
		handleChange
	}
}
