export const getActivityColor = (value: number) => {
	if (value === 0) return 'bg-zinc-800'
	if (value <= 2) return 'bg-purple-900'
	if (value <= 5) return 'bg-purple-700'
	if (value <= 10) return 'bg-purple-500'
	return 'bg-purple-400'
}
