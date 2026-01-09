import { Check } from 'lucide-react'

import { Button } from '@/shared/ui/external'

import { useToggleDone } from '../model/hooks/useToggleDone'

interface CardDoneButtonProps {
	cardId: string
	done: boolean
	boardId: string
}

export const CardDoneButton = ({
	cardId,
	done,
	boardId
}: CardDoneButtonProps) => {
	const { toggleDone } = useToggleDone({ cardId, boardId })

	return (
		<Button
			variant='none'
			size='none'
			onClick={() => toggleDone(done)}
			className={`rounded-full w-4.5 h-4.5 ${done ? 'bg-green-500' : 'border border-gray-600'}`}
		>
			{done && <Check size={16} />}
		</Button>
	)
}
