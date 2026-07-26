'use client'

import { Tag } from 'lucide-react'

import { TAG_COLORS } from '@/shared/config/tagColors'
import { Badge, Button, Input } from '@/shared/ui/external'
import { cn } from '@/shared/utils'

import { useEditableTags } from '../model/hooks/useEditableTags'
import { EditableTagsProps } from '../model/types/EditableProps'

export const EditableTags = ({
	cardId,
	boardId,
	tags,
	t
}: EditableTagsProps) => {
	const {
		title,
		setTitle,
		selectedColor,
		setSelectedColor,
		updateCardPending,
		canAddMore,
		handleAddTag,
		handleRemoveTag,
		handleKeyDown
	} = useEditableTags({ cardId, boardId, tags, t })

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
							<Button
								type='button'
								variant='none'
								size='none'
								className='ml-1 opacity-80 hover:opacity-100'
								onClick={() => handleRemoveTag(tag.id)}
								disabled={updateCardPending}
								aria-label={t('removeTag')}
							>
								×
							</Button>
						</Badge>
					))}
				</div>
			)}

			{canAddMore && (
				<div className='flex flex-col gap-2'>
					<div className='flex gap-2'>
						{TAG_COLORS.map(color => (
							<Button
								key={color}
								type='button'
								variant='none'
								size='none'
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
