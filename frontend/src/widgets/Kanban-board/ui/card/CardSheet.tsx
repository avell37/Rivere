'use client'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useTranslations } from 'next-intl'

import { ICard } from '@/entities/Card'

import { EditCardForm } from '@/features/card'
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
				<div className='p-8 mb-10'>
					<EditCardForm card={card} boardId={boardId} />
					<div className='min-w-0 overflow-x-hidden'>
						<span className='text-xs text-muted-foreground ml-1'>
							{t('card.edit.comments')}
						</span>
						<Chat cardId={card.id} />
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}
