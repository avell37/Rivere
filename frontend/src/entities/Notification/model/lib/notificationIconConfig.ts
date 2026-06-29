import { AlertCircle, LayoutDashboard, Trophy, UserCheck } from 'lucide-react'

export const iconConfig: Record<
	string,
	{ icon: React.ElementType; bg: string; color: string }
> = {
	deadline: {
		icon: AlertCircle,
		bg: 'bg-red-500/10',
		color: 'text-red-500'
	},
	achievement: {
		icon: Trophy,
		bg: 'bg-amber-500/10',
		color: 'text-amber-500'
	},
	board: {
		icon: LayoutDashboard,
		bg: 'bg-primary/10',
		color: 'text-primary'
	},
	assignment: {
		icon: UserCheck,
		bg: 'bg-blue-500/10',
		color: 'text-blue-500'
	}
}
