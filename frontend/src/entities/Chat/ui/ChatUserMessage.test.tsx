import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ChatUserMessage } from './ChatUserMessage'

vi.mock('next-intl', () => ({
	useTranslations: () => (key: string) => key
}))

vi.mock('@/entities/User', () => ({
	UserAvatar: () => <div data-testid='avatar' />
}))

vi.mock('@/features/reports/ui/ReportMessageButton', () => ({
	ReportMessageButton: () => <button type='button'>report</button>
}))

vi.mock('@/shared/utils', () => ({
	formatTime: () => '12:00'
}))

const message = {
	id: 'message-1',
	text: 'Hello team',
	userId: 'user-1',
	user: {
		avatar: null,
		nickname: 'Alex'
	},
	createdAt: '2026-07-25T00:00:00.000Z',
	updatedAt: '2026-07-25T00:00:00.000Z'
}

describe('ChatUserMessage', () => {
	it('opens delete alert and confirms deletion', async () => {
		const user = userEvent.setup()
		const onDelete = vi.fn()

		render(
			<ChatUserMessage
				message={message}
				locale='en'
				currentUserId='user-1'
				onDelete={onDelete}
			/>
		)

		await user.click(screen.getByTitle('deleteMessage'))
		expect(screen.getByText('deleteConfirmTitle')).toBeInTheDocument()

		await user.click(screen.getByText('deleteConfirmAction'))

		expect(onDelete).toHaveBeenCalledWith('message-1')
	})

	it('does not show delete button for other users messages', () => {
		render(
			<ChatUserMessage
				message={message}
				locale='en'
				currentUserId='user-2'
				onDelete={vi.fn()}
			/>
		)

		expect(screen.queryByTitle('deleteMessage')).not.toBeInTheDocument()
		expect(screen.getByText('report')).toBeInTheDocument()
	})
})
