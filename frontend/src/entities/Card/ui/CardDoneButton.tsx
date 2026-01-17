import { Check } from 'lucide-react'

import { Button } from '@/shared/ui/external'
import { cn } from '@/shared/utils'

import { useToggleDone } from '../model/hooks/useToggleDone'
import { CardDoneButtonProps } from '../model/types/CardProps'

export const CardDoneButton = ({
	cardId,
	boardId,
	done,
	className
}: CardDoneButtonProps) => {
	const { toggleDone, isPending } = useToggleDone({ cardId, boardId })

	return (
		<Button
			variant='none'
			size='none'
			onClick={() => toggleDone(done)}
			className={cn(
				'rounded-full w-4.5 h-4.5',
				done ? 'bg-green-500' : 'border border-gray-600',
				className ? className : null
			)}
			disabled={isPending}
		>
			{done && <Check size={16} />}
		</Button>
	)
}
