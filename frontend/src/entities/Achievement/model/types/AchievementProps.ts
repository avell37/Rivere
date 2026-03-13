import { IAchievement } from './IAchievement'

export interface AchievementItemProps {
	code: string
	goal: number
	progress: number
	achievedAt: string | null
}

export interface AchievementsListProps {
	achievements: IAchievement[]
}
