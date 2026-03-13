import { create } from 'zustand'

import { ICard } from '@/entities/Card'
import { IColumn } from '@/entities/Column'

interface BoardStore {
	columns: IColumn[]
	activeCard: ICard | null
	activeColumn: IColumn | null
	setColumns: (columns: IColumn[] | ((prev: IColumn[]) => IColumn[])) => void
	setActiveCard: (card: ICard | null) => void
	setActiveColumn: (column: IColumn | null) => void
}

export const useBoardStore = create<BoardStore>((set, get) => ({
	columns: [],
	activeCard: null,
	activeColumn: null,
	setColumns: columns =>
		set(state => ({
			columns:
				typeof columns === 'function' ? columns(state.columns) : columns
		})),
	setActiveCard: activeCard => set({ activeCard }),
	setActiveColumn: activeColumn => set({ activeColumn })
}))
