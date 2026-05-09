'use client'
import { UseFormReturn } from 'react-hook-form'

import { BoardBackground } from '@/entities/Board'

export interface EditBoardFormData {
	title?: string
	background: BoardBackground
}

export interface EditBoardFormProps {
	form: UseFormReturn<EditBoardFormData>
	isPending?: boolean
	onSubmit: (data: EditBoardFormData) => void
	t: (key: string) => string
}
