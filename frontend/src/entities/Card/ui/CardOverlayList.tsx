import { ICard } from '../model/types/ICard'

import { CardOverlayItem } from './CardOverlayItem'

export const CardOverlayList = ({ cards }: { cards: ICard[] }) => {
	return (
		<div className='flex flex-col gap-4'>
			{cards?.map(card => (
				<CardOverlayItem key={card.id} card={card} />
			))}
			<div className='rounded-md' />
		</div>
	)
}
