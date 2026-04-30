'use client'
import { Check } from 'lucide-react'
import { memo } from 'react'

import { Button } from '@/shared/ui/external'
import { cn } from '@/shared/utils'

import { useToggleDone } from '../model/hooks/useToggleDone'
import { CardDoneButtonProps } from '../model/types/CardProps'

const CardDoneButtonComponent = ({
	cardId,
	boardId,
	done,
	className
}: CardDoneButtonProps) => {
	const { toggleDone, isPending } = useToggleDone({ cardId, boardId })

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		toggleDone(done)
	}

	return (
		<Button
			variant='none'
			size='none'
			onClick={handleClick}
			className={cn(
				'rounded-full',
				done ? 'bg-green-500' : 'border border-gray-600',
				className ? className : null
			)}
			disabled={isPending}
		>
			{done && <Check className='size-3' />}
		</Button>
	)
}

export const CardDoneButton = memo(CardDoneButtonComponent)
