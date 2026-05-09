import { UseFormReturn } from 'react-hook-form'

import { BoardBackground } from '@/entities/Board'

export interface CreateBoardFormData {
	title: string
	background: BoardBackground
}

export interface CreateBoardFormProps {
	form: UseFormReturn<CreateBoardFormData>
	isPending?: boolean
	onSubmit: (data: CreateBoardFormData) => void
	t: (key: string) => string
}
