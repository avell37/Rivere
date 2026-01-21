import { IBoardColumnIdentifiers } from '@/shared/types/IBoardColumnIdentifiers'

export interface CreateCardProps extends IBoardColumnIdentifiers {
	onSuccess: (open: boolean) => void
}
