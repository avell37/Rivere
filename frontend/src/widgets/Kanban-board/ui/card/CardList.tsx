'use client'
import { SortableContext } from '@dnd-kit/sortable'
import { useTranslations } from 'next-intl'
import { memo, useCallback, useMemo, useState } from 'react'

import { ICard } from '@/entities/Card'

import { Card } from './Card'
import { CardSheet } from './CardSheet'

const CardListComponent = ({
	cards,
	boardId
}: {
	cards: ICard[]
	boardId: string
}) => {
	const [openCardId, setOpenCardId] = useState<string | null>(null)
	const t = useTranslations('card')
	const cardsIds = useMemo(() => cards?.map(c => c.id), [cards])
	const handleClick = useCallback((cardId: string) => {
		setOpenCardId(cardId)
	}, [])

	return (
		<div className='flex flex-col'>
			<ul className='flex flex-col gap-2'>
				<SortableContext items={cardsIds || []}>
					{cards.map(card => (
						<Card
							key={card.id}
							card={card}
							boardId={boardId}
							onClick={() => handleClick(card.id)}
						/>
					))}
				</SortableContext>
				{cards?.length === 0 && (
					<div
						className='h-20 border-2 border-dashed dark:text-white border-black dark:border-gray-300 
					rounded-lg flex items-center justify-center font-bold text-sm'
					>
						{t('dragCard')}
					</div>
				)}
				<div className='rounded-md' />
			</ul>

			{openCardId && (
				<CardSheet
					open
					onOpenChange={() => setOpenCardId(null)}
					card={cards.find(card => card.id === openCardId)}
					boardId={boardId}
				/>
			)}
		</div>
	)
}

export const CardList = memo(CardListComponent)
