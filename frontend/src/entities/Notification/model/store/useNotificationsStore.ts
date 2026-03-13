import { create } from 'zustand'

import { INotification } from '../types/INotification'

interface NotificationsState {
	notifications: INotification[]
	add: (not: INotification) => void
	setAll: (nots: INotification[]) => void
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
