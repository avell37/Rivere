import { TranslateValues } from '@/entities/User'

import { ISession } from './ISession'

export interface SessionProps {
	title: string
	description: string
	span: string
	isCurrent?: boolean
	icon: React.ReactNode
	currentSession: string
	onTerminate?: () => void
}

export interface SessionListProps {
	userSessions?: ISession[]
	locale: string
	t: (key: string, values?: TranslateValues) => string
	terminateSelectedSession: (id: string) => void
}
