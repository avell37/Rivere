'use client'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'

import { UpdateCardPayload, useUpdateCardMutation } from '@/entities/Card'

import { EditableKey, EditableValue } from '../types/EditableProps'

export const useUpdateCard = (cardId: string, key: EditableKey) => {
	const t = useTranslations()
	const [isEditing, setIsEditing] = useState(false)
	const { getValues } = useFormContext()
	const previousValueRef = useRef<EditableValue | null>(null)

	const { updateCard, updateCardPending } = useUpdateCardMutation(cardId)

	useEffect(() => {
		if (isEditing) {
			previousValueRef.current = getValues(key) as EditableValue
		}
	}, [isEditing, getValues, key])

	const handleBlur = (value: EditableValue) => {
		setIsEditing(false)
		if (value !== previousValueRef.current) {
			updateCard({ [key]: value } as UpdateCardPayload, {
				onSuccess: () => {
					toast.success(t('card.edit.editSuccess'))
				}
			})
		}
	}

	const handleChange = (value: EditableValue) => {
		updateCard({ [key]: value ?? null } as UpdateCardPayload, {
			onSuccess: () => {
				toast.success(t('card.edit.editSuccess'))
			}
		})
	}

	return {
		isEditing,
		isLoading: updateCardPending,
		setIsEditing,
		handleBlur,
		handleChange
	}
}
