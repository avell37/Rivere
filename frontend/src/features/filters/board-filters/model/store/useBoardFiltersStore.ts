import { create } from 'zustand'

import { Priority } from '@/entities/Card'

export type StatusFilter = 'all' | 'active' | 'done'

export type DeadlineFilter =
	| 'all'
	| 'overdue'
	| 'due-soon'
	| 'has-deadline'
	| 'no-deadline'

interface BoardFiltersState {
	search: string
	priorities: Priority[]
	tagIds: string[]
	status: StatusFilter
	deadline: DeadlineFilter
	assigneeId: string | null
	setSearch: (v: string) => void
	togglePriority: (p: Priority) => void
	toggleTagId: (tagId: string) => void
	setStatus: (v: StatusFilter) => void
	setDeadline: (v: DeadlineFilter) => void
	setAssigneeId: (v: string | null) => void
	reset: () => void
}

export const useBoardFiltersStore = create<BoardFiltersState>(set => ({
	search: '',
	priorities: [],
	tagIds: [],
	status: 'all',
	deadline: 'all',
	assigneeId: null,
	setSearch: search => set({ search }),
	togglePriority: priority =>
		set(state => ({
			priorities: state.priorities.includes(priority)
				? state.priorities.filter(p => p !== priority)
				: [...state.priorities, priority]
		})),
	toggleTagId: tagId =>
		set(state => ({
			tagIds: state.tagIds.includes(tagId)
				? state.tagIds.filter(id => id !== tagId)
				: [...state.tagIds, tagId]
		})),
	setStatus: status => set({ status }),
	setDeadline: deadline => set({ deadline }),
	setAssigneeId: assigneeId => set({ assigneeId }),
	reset: () =>
		set({
			search: '',
			priorities: [],
			tagIds: [],
			status: 'all',
			deadline: 'all',
			assigneeId: null
		})
}))

export const useHasActiveFilters = () =>
	useBoardFiltersStore(
		s =>
			s.search !== '' ||
			s.priorities.length > 0 ||
			s.tagIds.length > 0 ||
			s.status !== 'all' ||
			s.deadline !== 'all' ||
			s.assigneeId !== null
	)

export const useActiveFiltersCount = () =>
	useBoardFiltersStore(s => {
		let count = 0
		if (s.search !== '') count++
		if (s.priorities.length > 0) count++
		if (s.tagIds.length > 0) count++
		if (s.status !== 'all') count++
		if (s.deadline !== 'all') count++
		if (s.assigneeId !== null) count++

		return count
	})
