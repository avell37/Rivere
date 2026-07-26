'use client'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useTranslations } from 'next-intl'

import { ICard } from '@/entities/Card'

import { EditCardForm } from '@/features/card'
import { CardAttachments } from '@/features/card/attachments/ui/CardAttachments'
import { Chat } from '@/features/chat'
import { ReportButton } from '@/features/reports'

import { useIsMobile } from '@/shared/config'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from '@/shared/ui/external'

export const CardSheet = ({
	open,
	onOpenChange,
	card,
	boardId
}: {
	open: boolean
	onOpenChange: (open: boolean) => void
	card?: ICard
	boardId: string
}) => {
	const t = useTranslations()
	const isMobile = useIsMobile()

	if (!card) return null

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetHeader className='p-0'>
				<VisuallyHidden>
					<SheetTitle />
				</VisuallyHidden>
				<VisuallyHidden>
					<SheetDescription />
				</VisuallyHidden>
			</SheetHeader>
			<SheetContent
				className={`p-4 overflow-y-auto ${isMobile ? 'w-full' : ''}`}
			>
				<div className='absolute top-4 right-12 z-10'>
					<ReportButton
						targetType='CARD'
						targetId={card.id}
						formNamespace='card'
						description={t('reports.card.description', {
							title: card.title
						})}
					/>
				</div>
				<div className='flex flex-col gap-6 p-8 mb-10'>
					<EditCardForm key={card.id} card={card} boardId={boardId} />
					<Chat key={card.id} cardId={card.id} boardId={boardId} />
					<CardAttachments cardId={card.id} />
				</div>
			</SheetContent>
		</Sheet>
	)
}
