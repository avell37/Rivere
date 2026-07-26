'use client'

import { MENTION_TEXT_PATTERN } from '@/shared/utils/mentions'

export const ChatMessageText = ({ text }: { text: string }) => {
	const parts = text.split(MENTION_TEXT_PATTERN)

	return (
		<>
			{parts.map((part, index) =>
				part.startsWith('@') ? (
					<span
						key={`${part}-${index}`}
						className='font-medium text-indigo-600 dark:text-indigo-400'
					>
						{part}
					</span>
				) : (
					<span key={`${part}-${index}`}>{part}</span>
				)
			)}
		</>
	)
}
