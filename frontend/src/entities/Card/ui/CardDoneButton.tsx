'use client'
import { Check } from 'lucide-react'
import { memo } from 'react'

import { Button } from '@/shared/ui/external'
import { cn } from '@/shared/utils'

import { useToggleDoneMutation } from '../model/hooks/useCardQueries'
import { CardDoneButtonProps } from '../model/types/CardProps'

const CardDoneButtonComponent = ({
	cardId,
	boardId,
	done,
	className
}: CardDoneButtonProps) => {
	const { toggleDone, togglePending } = useToggleDoneMutation({
		cardId,
		boardId
	})

	return (
		<Button
			variant='none'
			size='none'
			onClick={e => toggleDone(e, done)}
			className={cn(
				'rounded-full',
				done ? 'bg-green-500' : 'border border-gray-600',
				className ? className : null
			)}
			disabled={togglePending}
		>
			{done && <Check className='size-3' />}
		</Button>
	)
}

export const CardDoneButton = memo(CardDoneButtonComponent)
