export const formatDate = (value: string | Date, locale: string = 'ru') => {
	const date = value instanceof Date ? value : new Date(value)

	return new Intl.DateTimeFormat(locale, {
		weekday: 'short',
		day: '2-digit',
		month: 'short',
		year: 'numeric'
	}).format(date)
}

export const formatTime = (value: string | Date, locale: string = 'ru') => {
	const date = value instanceof Date ? value : new Date(value)
	return new Intl.DateTimeFormat(locale, {
		hour: '2-digit',
		minute: '2-digit'
	}).format(date)
}
