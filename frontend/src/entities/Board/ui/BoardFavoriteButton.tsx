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

	const baseColor = isBoardPage
		? 'text-foreground'
		: 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.75)]'
	const fillColor = isBoardPage
		? 'fill-foreground'
		: 'fill-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.75)]'

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
