'use client'
import { Star } from 'lucide-react'

import { Button } from '@/shared/ui/external'

import { useToggleFavoriteBoard } from '../model/hooks/useToggleFavoriteBoard'

interface FavoriteButtonProps {
	boardId: string
	isFavorite?: boolean
	buttonClassname?: string
}

export const BoardFavoriteButton = ({
	boardId,
	isFavorite,
	buttonClassname
}: FavoriteButtonProps) => {
	const { handleToggleFavorite } = useToggleFavoriteBoard(boardId, isFavorite)

	return (
		<Button
			variant='none'
			size='none'
			className={`${buttonClassname}
                ${isFavorite ? 'opacity-100' : ''}`}
			onClick={handleToggleFavorite}
		>
			<Star
				size={18}
				className={`${isFavorite ? 'fill-white text-white' : 'text-white'}`}
			/>
		</Button>
	)
}
