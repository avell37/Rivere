import { IBoardColumnIdentifiers } from '@/shared/types'

export interface DeleteColumnModalProps extends IBoardColumnIdentifiers {
	open: boolean
	onOpenChange: (open: boolean) => void
}
