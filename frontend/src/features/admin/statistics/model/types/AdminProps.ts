export interface AdminStats {
	users: {
		total: string | number
		today: string | number
	}
	boards: {
		total: string | number
		today: string | number
	}
	messages: {
		total: string | number
		today: string | number
	}
	completedCards: {
		total: string | number
		today: string | number
	}
	banned: {
		total: string | number
		today: string | number
	}
}
