import { ICard } from '../model/types/ICard'

import { CardOverlayItem } from './CardOverlayItem'

export const CardOverlayList = ({ cards }: { cards: ICard[] }) => {
	return (
		<ul className='flex flex-col items-start gap-2'>
			{cards?.map(card => (
				<CardOverlayItem key={card.id} card={card} />
			))}
			<div className='rounded-md' />
		</ul>
	)
}
