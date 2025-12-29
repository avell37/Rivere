export interface ISession {
	id: string
	browser: string
	device: string
	userAgent: string
	os: string
	isCurrent: boolean
	lastActiveAt: string
	createdAt: string
}
