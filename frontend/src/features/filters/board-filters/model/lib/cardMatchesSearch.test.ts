import { describe, expect, it } from 'vitest'

import { Priority } from '@/entities/Card'

import { cardMatchesSearch } from './cardMatchesSearch'

const baseCard = {
	id: '1',
	title: 'Fix login bug',
	description: 'Check OAuth redirect',
	position: 0,
	priority: Priority.HIGH,
	deadline: '',
	columnId: 'col-1',
	chatId: 'chat-1',
	chat: { id: 'chat-1', cardId: '1', messages: [] },
	done: false,
	tags: [{ id: 'tag-1', title: 'Backend', background: '#000' }],
	assignee: { id: 'u1', nickname: 'Alex', avatar: null }
}

describe('cardMatchesSearch', () => {
	it('matches by title', () => {
		expect(cardMatchesSearch(baseCard, 'login')).toBe(true)
	})

	it('matches by description', () => {
		expect(cardMatchesSearch(baseCard, 'oauth')).toBe(true)
	})

	it('matches by tag title', () => {
		expect(cardMatchesSearch(baseCard, 'backend')).toBe(true)
	})

	it('matches by assignee nickname', () => {
		expect(cardMatchesSearch(baseCard, 'alex')).toBe(true)
	})

	it('returns true for empty query', () => {
		expect(cardMatchesSearch(baseCard, '   ')).toBe(true)
	})

	it('returns false when nothing matches', () => {
		expect(cardMatchesSearch(baseCard, 'payments')).toBe(false)
	})
})
