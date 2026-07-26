'use client'

import { FileText, Image as ImageIcon, Paperclip, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import { useUserStore } from '@/entities/User'

import { S3_URL } from '@/shared/libs'
import { EmptyState } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'
import { formatFileSize } from '@/shared/utils'

import { useCardAttachments } from '../model/hooks/useCardAttachments'

export const CardAttachments = ({ cardId }: { cardId: string }) => {
	const t = useTranslations('card.attachments')
	const userId = useUserStore(state => state.user?.id)
	const inputRef = useRef<HTMLInputElement>(null)
	const {
		attachments,
		isLoading,
		uploadAttachment,
		isUploading,
		deleteAttachment
	} = useCardAttachments(cardId)

	return (
		<section className='mt-4 flex flex-col gap-3'>
			<div className='flex items-center justify-between gap-3'>
				<div className='flex items-center gap-2 text-sm font-medium'>
					<Paperclip className='size-4' />
					{t('title')}
				</div>
				<>
					<input
						ref={inputRef}
						type='file'
						className='hidden'
						accept='image/*,.pdf,.txt'
						onChange={event => {
							const file = event.target.files?.[0]
							if (file) uploadAttachment(file)
							event.target.value = ''
						}}
					/>
					<Button
						type='button'
						variant='outline'
						size='sm'
						disabled={isUploading}
						onClick={() => inputRef.current?.click()}
					>
						{t('upload')}
					</Button>
				</>
			</div>

			<p className='text-xs text-muted-foreground'>{t('hint')}</p>

			{isLoading ? (
				<p className='text-sm text-muted-foreground'>{t('loading')}</p>
			) : attachments.length === 0 ? (
				<EmptyState centered className='py-4'>
					{t('empty')}
				</EmptyState>
			) : (
				<ul className='flex flex-col gap-2'>
					{attachments.map(attachment => {
						const isImage = attachment.mimeType.startsWith('image/')
						const Icon = isImage ? ImageIcon : FileText

						return (
							<li
								key={attachment.id}
								className='flex items-center gap-3 rounded-lg border bg-card p-3'
							>
								<Icon className='size-4 shrink-0 text-muted-foreground' />
								<div className='min-w-0 flex-1'>
									<a
										href={`${S3_URL}${attachment.key}`}
										target='_blank'
										rel='noreferrer'
										className='block truncate text-sm font-medium hover:underline'
									>
										{attachment.originalName}
									</a>
									<p className='text-xs text-muted-foreground'>
										{formatFileSize(attachment.size)} ·{' '}
										{attachment.uploadedBy.nickname}
									</p>
								</div>
								{attachment.uploadedBy.id === userId && (
									<Button
										type='button'
										variant='none'
										size='none'
										className='text-muted-foreground hover:text-destructive'
										onClick={() =>
											deleteAttachment(attachment.id)
										}
									>
										<Trash2 className='size-4' />
									</Button>
								)}
							</li>
						)
					})}
				</ul>
			)}
		</section>
	)
}
