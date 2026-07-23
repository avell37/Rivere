'use client'
import { Tag } from 'lucide-react'
import { KeyboardEvent, useState } from 'react'
import { toast } from 'sonner'

import { CardTagPayload, useUpdateCardMutation } from '@/entities/Card'

import { MAX_CARD_TAGS, TAG_COLORS } from '@/shared/config/tagColors'
import { Badge, Button, Input } from '@/shared/ui/external'
import { cn } from '@/shared/utils'

import { EditableTagsProps } from '../model/types/EditableProps'

export const EditableTags = ({ cardId, tags, t }: EditableTagsProps) => {
	const [title, setTitle] = useState('')
	const [selectedColor, setSelectedColor] = useState<string>(TAG_COLORS[0])
	const { updateCard, updateCardPending } = useUpdateCardMutation(cardId)

	const saveTags = (nextTags: CardTagPayload[]) => {
		updateCard(
			{ tags: nextTags },
			{
				onSuccess: () => toast.success(t('editSuccess'))
			}
		)
	}

	const handleAddTag = () => {
		const trimmed = title.trim()
		if (!trimmed) return

		if (tags.length >= MAX_CARD_TAGS) {
			toast.error(t('tagsMax'))
			return
		}

		if (
			tags.some(tag => tag.title.toLowerCase() === trimmed.toLowerCase())
		) {
			toast.error(t('tagsDuplicate'))
			return
		}

		saveTags([
			...tags.map(({ title, background }) => ({ title, background })),
			{ title: trimmed, background: selectedColor }
		])
		setTitle('')
	}

	const handleRemoveTag = (tagId: string) => {
		saveTags(
			tags
				.filter(tag => tag.id !== tagId)
				.map(({ title, background }) => ({ title, background }))
		)
	}

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault()
			handleAddTag()
		}
	}

	return (
		<div className='flex flex-col gap-3'>
			<div className='flex items-center gap-2'>
				<Tag size={16} />
				<span className='text-xs font-bold'>{t('editTagsLabel')}</span>
			</div>

			{tags.length > 0 && (
				<div className='flex flex-wrap gap-2'>
					{tags.map(tag => (
						<Badge
							key={tag.id}
							variant='secondary'
							className='gap-1 border-0 shadow-none text-white'
							style={{ backgroundColor: tag.background }}
						>
							{tag.title}
							<button
								type='button'
								className='ml-1 opacity-80 hover:opacity-100'
								onClick={() => handleRemoveTag(tag.id)}
								disabled={updateCardPending}
								aria-label={t('removeTag')}
							>
								×
							</button>
						</Badge>
					))}
				</div>
			)}

			{tags.length < MAX_CARD_TAGS && (
				<div className='flex flex-col gap-2'>
					<div className='flex gap-2'>
						{TAG_COLORS.map(color => (
							<button
								key={color}
								type='button'
								className={cn(
									'size-5 rounded-full border-2 transition',
									selectedColor === color
										? 'border-muted-foreground scale-110'
										: 'border-border'
								)}
								style={{ backgroundColor: color }}
								onClick={() => setSelectedColor(color)}
								aria-label={color}
							/>
						))}
					</div>
					<div className='flex gap-2'>
						<Input
							value={title}
							onChange={event => setTitle(event.target.value)}
							onKeyDown={handleKeyDown}
							placeholder={t('editTagsPlaceholder')}
							maxLength={24}
							disabled={updateCardPending}
						/>
						<Button
							type='button'
							size='sm'
							onClick={handleAddTag}
							disabled={updateCardPending || !title.trim()}
						>
							{t('addTag')}
						</Button>
					</div>
				</div>
			)}
		</div>
	)
}
