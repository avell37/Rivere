import { create } from 'zustand'

import { ICard } from '@/entities/Card/model/types/ICard'
import { IColumn } from '@/entities/Column/model/types/IColumn'

interface DndStore {
	cards: ICard[]
	columns: IColumn[]
	activeColumn: IColumn | null
	activeCard: ICard | null
	setCards: (cards: ICard[]) => void
	setColumns: (columns: IColumn[]) => void
	setActiveColumn: (column: IColumn | null) => void
	setActiveCard: (card: ICard | null) => void
}

export const useDndStore = create<DndStore>((set, get) => ({
	cards: [],
	columns: [],
	activeColumn: null,
	activeCard: null,
	setCards: cards => set({ cards: cards }),
	setColumns: columns => set({ columns: columns }),
	setActiveColumn: column => set({ activeColumn: column }),
	setActiveCard: card => set({ activeCard: card })
}))
