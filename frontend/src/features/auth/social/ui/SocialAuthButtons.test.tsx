import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SocialAuthButtons } from './SocialAuthButtons'

vi.mock('next-intl', () => ({
	useTranslations: (namespace: string) => (key: string) => {
		if (namespace === 'auth.wrapper') {
			return key === 'formSeparator' ? 'or e-mail' : key
		}

		return 'Continue with Yandex'
	}
}))

vi.mock('@/shared/libs', () => ({
	API_URL: {
		socialAuth: (provider: string) =>
			`http://localhost:5000/api/auth/social/${provider}`
	}
}))

describe('SocialAuthButtons', () => {
	it('renders yandex button and separator', () => {
		render(<SocialAuthButtons />)

		expect(screen.getByText('Continue with Yandex')).toBeInTheDocument()
		expect(screen.getByText('or e-mail')).toBeInTheDocument()
	})

	it('redirects to backend yandex oauth endpoint', async () => {
		const user = userEvent.setup()
		const originalLocation = window.location

		Object.defineProperty(window, 'location', {
			configurable: true,
			value: { href: '' }
		})

		render(<SocialAuthButtons />)
		await user.click(screen.getByText('Continue with Yandex'))

		expect(window.location.href).toBe(
			'http://localhost:5000/api/auth/social/yandex'
		)

		Object.defineProperty(window, 'location', {
			configurable: true,
			value: originalLocation
		})
	})
})
