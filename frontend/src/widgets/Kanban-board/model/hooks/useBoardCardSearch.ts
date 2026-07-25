'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

import { useBoardStore } from '@/entities/Board'
import { ICard } from '@/entities/Card'

import {
	cardMatchesSearch,
	useBoardFiltersStore
} from '@/features/filters/board-filters'

export const useBoardCardSearch = () => {
	const [open, setOpen] = useState(false)
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const columns = useBoardStore(state => state.columns)
	const { search, setSearch } = useBoardFiltersStore()

	const MAX_RESULTS = 8

	const results = useMemo(() => {
		if (!search.trim()) return []

		const items: Array<{ card: ICard; columnTitle: string }> = []

		for (const column of columns) {
			for (const card of column.cards) {
				if (cardMatchesSearch(card, search)) {
					items.push({ card, columnTitle: column.title })
				}
			}
		}

		return items.slice(0, MAX_RESULTS)
	}, [columns, search])

	const showResults = open && search.trim().length > 0

	const openCard = (cardId: string) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set('card', cardId)
		router.push(`${pathname}?${params.toString()}`)
		setOpen(false)
	}

	return {
		results,
		showResults,
		search,
		openCard,
		setSearch,
		setOpen
	}
}
