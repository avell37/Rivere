export const formatDate = (value: string | Date, locale: string = 'ru') => {
	const date = value instanceof Date ? value : new Date(value)

	return new Intl.DateTimeFormat(locale, {
		weekday: 'short',
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	}).format(date)
}

export const formatDateTime = (value: string | Date, locale: string = 'ru') => {
	const date = value instanceof Date ? value : new Date(value)

	return new Intl.DateTimeFormat(locale, {
		weekday: 'short',
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	}).format(date)
}

export const formatTime = (
	value: string | number | Date,
	locale: string = 'ru'
) => {
	const date = value instanceof Date ? value : new Date(value)
	return new Intl.DateTimeFormat(locale, {
		hour: '2-digit',
		minute: '2-digit'
	}).format(date)
}

export const formatPriority = (priority: string) =>
	priority.charAt(0) + priority.slice(1).toLowerCase()

export const formatFileSize = (bytes: number) => {
	if (bytes < 1024) return `${bytes} B`
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
