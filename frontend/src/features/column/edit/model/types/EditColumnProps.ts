'use client'
import { FieldValues, UseFormReturn } from 'react-hook-form'

import { IBoardColumnIdentifiers } from '@/shared/types/IBoardColumnIdentifiers'

export interface EditColumnFormValues {
	title: string
}

export interface EditColumnFormProps<
	T extends FieldValues = EditColumnFormValues
> {
	form: UseFormReturn<T>
	isPending?: boolean
	onSubmit: (data: T) => void
	t: (key: string) => string
}

export interface EditColumnModalProps extends IBoardColumnIdentifiers {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export interface EditColumnProps extends IBoardColumnIdentifiers {
	onSuccess: () => void
}
