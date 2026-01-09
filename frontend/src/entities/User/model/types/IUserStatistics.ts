export interface IUserStatistics {
	totalCompletedCards: number
	usersInvited: number

	dailyCompletedCards: Record<string, number>
	currentStreakDays: number
	longestStreakDays: number

	createdAt: string
	updatedAt: string
}

export interface ActivityDay {
	date: string
	value: number
}
