'use client'
import { Star } from 'lucide-react'

import { Button } from '@/shared/ui/external'

import { useToggleFavoriteBoard } from '../model/hooks/useToggleFavoriteBoard'

interface FavoriteButtonProps {
	boardId: string
	isFavorite?: boolean
	isBoardPage?: boolean
	buttonClassname?: string
}

export const BoardFavoriteButton = ({
	boardId,
	isFavorite,
	isBoardPage,
	buttonClassname
}: FavoriteButtonProps) => {
	const { handleToggleFavorite } = useToggleFavoriteBoard(boardId, isFavorite)

	const baseColor = isBoardPage ? 'text-black dark:text-white' : 'text-white'
	const fillColor = isBoardPage ? 'fill-black dark:fill-white' : 'fill-white'

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
				className={`${baseColor} ${isFavorite ? fillColor : ''}`}
			/>
		</Button>
	)
}
