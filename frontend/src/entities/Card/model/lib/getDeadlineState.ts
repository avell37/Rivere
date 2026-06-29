export function getDeadlineState(
	deadline: string | null | undefined,
	done: boolean
) {
	if (!deadline || done) return 'none'

	const now = new Date()
	const dl = new Date(deadline)
	const diff = dl.getTime() - now.getTime()

	if (diff < 0) return 'overdue'

	if (diff < 24 * 60 * 60 * 1000) return 'due-soon'

	return 'normal'
}
