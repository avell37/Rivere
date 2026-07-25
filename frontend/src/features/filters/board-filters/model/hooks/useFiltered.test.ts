import { renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { Priority } from '@/entities/Card'

import { useBoardFiltersStore } from '../store/useBoardFiltersStore'

import { useFiltered } from './useFiltered'

const cards = [
	{
		id: '1',
		title: 'Alpha task',
		description: 'First',
		position: 0,
		priority: Priority.HIGH,
		deadline: '',
		columnId: 'col-1',
		chatId: 'chat-1',
		chat: { id: 'chat-1', cardId: '1', messages: [] },
		done: false,
		assigneeId: 'user-1',
		tags: [{ id: 'tag-1', title: 'Bug', background: '#f00' }]
	},
	{
		id: '2',
		title: 'Beta task',
		description: 'Second',
		position: 1,
		priority: Priority.LOW,
		deadline: '',
		columnId: 'col-1',
		chatId: 'chat-2',
		chat: { id: 'chat-2', cardId: '2', messages: [] },
		done: true,
		assigneeId: 'user-2',
		tags: [{ id: 'tag-2', title: 'Feature', background: '#0f0' }]
	}
]

afterEach(() => {
	useBoardFiltersStore.getState().reset()
})

describe('useFiltered', () => {
	it('filters by search query', () => {
		useBoardFiltersStore.getState().setSearch('alpha')

		const { result } = renderHook(() => useFiltered(cards))

		expect(result.current.filteredCards).toHaveLength(1)
		expect(result.current.filteredCards[0].id).toBe('1')
		expect(result.current.isFiltered).toBe(true)
	})

	it('filters by priority', () => {
		useBoardFiltersStore.getState().togglePriority(Priority.LOW)

		const { result } = renderHook(() => useFiltered(cards))

		expect(result.current.filteredCards).toHaveLength(1)
		expect(result.current.filteredCards[0].priority).toBe(Priority.LOW)
	})

	it('filters by tag ids', () => {
		useBoardFiltersStore.getState().toggleTagId('tag-2')

		const { result } = renderHook(() => useFiltered(cards))

		expect(result.current.filteredCards).toHaveLength(1)
		expect(result.current.filteredCards[0].id).toBe('2')
	})

	it('filters by assignee', () => {
		useBoardFiltersStore.getState().setAssigneeId('user-1')

		const { result } = renderHook(() => useFiltered(cards))

		expect(result.current.filteredCards).toHaveLength(1)
		expect(result.current.filteredCards[0].assigneeId).toBe('user-1')
	})
})
