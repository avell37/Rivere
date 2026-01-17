export const getActivityColor = (value: number) => {
	if (value === 0) return 'dark:bg-zinc-800'
	if (value <= 2) return 'bg-purple-300'
	if (value <= 5) return 'bg-purple-500'
	if (value <= 10) return 'bg-purple-600'
	if (value <= 20) return 'bg-purple-800'
	if (value <= 30) return 'bg-purple-900'
	return 'bg-purple-400'
}
