export interface IAchievement {
	id: string
	code: string
	title: string
	description: string
	goal: number
	progress: number
	achievedAt: string | null
	createdAt: string
	updatedAt: string
}
