'use client'
import { Star } from 'lucide-react'

import { Button } from '@/shared/ui/external'

import { useToggleFavoriteMutation } from '../model/hooks/useBoardQueries'
import { BoardFavoriteButtonProps } from '../model/types/BoardProps'

export const BoardFavoriteButton = ({
	boardId,
	isFavorite,
	isBoardPage,
	buttonClassname
}: BoardFavoriteButtonProps) => {
	const { handleToggleFavorite, toggleFavoritePending } =
		useToggleFavoriteMutation(boardId, isFavorite)

	const baseColor = isBoardPage ? 'text-black dark:text-white' : 'text-white'
	const fillColor = isBoardPage ? 'fill-black dark:fill-white' : 'fill-white'

	return (
		<Button
			variant='none'
			size='none'
			className={`${buttonClassname}
                ${isFavorite ? 'opacity-100' : ''}`}
			onClick={handleToggleFavorite}
			disabled={toggleFavoritePending}
		>
			<Star
				size={18}
				className={`${baseColor} ${isFavorite ? fillColor : ''}`}
			/>
		</Button>
	)
}
