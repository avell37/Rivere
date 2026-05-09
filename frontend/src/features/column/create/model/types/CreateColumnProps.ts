'use client'
import { UseFormReturn } from 'react-hook-form'

export interface CreateColumnFormData {
	title: string
}

export interface CreateColumnFormProps {
	form: UseFormReturn<CreateColumnFormData>
	isPending?: boolean
	onSubmit: (data: CreateColumnFormData) => void
	t: (key: string) => string
}
