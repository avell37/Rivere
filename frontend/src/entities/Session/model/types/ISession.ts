export interface Metadata {
	device: {
		browser: string
		os: string
		type: string
	}
	ip: string
	location: {
		city: string
		country: string
		latidute: string
		longitude: string
	}
}

export interface ISession {
	id: string
	createdAt: string
	lastActiveAt: string
	metadata: Metadata
	isCurrent: boolean
}
