'use client'
import { UseFormReturn } from 'react-hook-form'

import { Priority } from '@/entities/Card'

import { IBoardColumnIdentifiers } from '@/shared/types/IBoardColumnIdentifiers'

export interface CreateCardProps extends IBoardColumnIdentifiers {
	onSuccess: (open: boolean) => void
}

export interface CreateCardFormData {
	title: string
	description?: string
	priority: Priority
	deadline?: string
}

export interface CreateCardFormProps {
	form: UseFormReturn<CreateCardFormData>
	onSubmit: (data: CreateCardFormData) => void
	isPending: boolean
	t: (key: string) => string
}
