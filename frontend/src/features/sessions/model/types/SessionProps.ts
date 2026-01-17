import { ISession } from './ISession'

export interface SessionProps {
	title: string
	date: string
	isCurrent?: boolean
	icon: React.ReactNode
	onTerminate?: () => void
}

export interface SessionListProps {
	userSessions?: ISession[]
	locale: string
	t: (key: string, values?: Record<string, any>) => string
	terminateSelectedSession: (id: string) => void
}
