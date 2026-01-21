import { UseFormReturn } from 'react-hook-form'

import { IBoardColumnIdentifiers } from '@/shared/types/IBoardColumnIdentifiers'

export interface EditColumnFormProps {
	form: UseFormReturn<any>
	onSubmit: (data: any) => void
	t: (key: string) => string
}

export interface EditColumnModalProps extends IBoardColumnIdentifiers {
	open: boolean
	onOpenChange: (open: boolean) => void
}

export interface EditColumnProps extends IBoardColumnIdentifiers {
	onSuccess: () => void
}
