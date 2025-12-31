import { create } from 'zustand'

export interface Notification {
	id: string
	type: string
	message: string
	entityId?: string
	read: boolean
	createdAt: string
}

interface NotificationsState {
	notifications: Notification[]
	add: (not: Notification) => void
	setAll: (nots: Notification[]) => void
	markAllReadLocal: () => void
	clearLocal: () => void
}

export const useNotificationsStore = create<NotificationsState>(set => ({
	notifications: [],
	add: not =>
		set(state => ({ notifications: [not, ...state.notifications] })),
	setAll: nots => set({ notifications: nots }),
	markAllReadLocal: () =>
		set(state => ({
			notifications: state.notifications.map(not => ({
				...not,
				read: true
			}))
		})),
	clearLocal: () => set({ notifications: [] })
}))
