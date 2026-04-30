'use client'
import { UseFormReturn } from 'react-hook-form'

import { IBoardColumnIdentifiers } from '@/shared/types/IBoardColumnIdentifiers'

export interface CreateCardProps extends IBoardColumnIdentifiers {
	onSuccess: (open: boolean) => void
}

export interface CreateCardFormData {
	title: string
	description?: string
	priority: string
	deadline?: Date
}

export interface CreateCardFormProps {
	form: UseFormReturn<CreateCardFormData>
	onSubmit: (data: CreateCardFormData) => void
	t: (key: string) => string
}
