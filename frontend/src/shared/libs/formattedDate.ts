export const formattedDate = (value: string | Date, locale: string = 'ru') => {
	const date = value instanceof Date ? value : new Date(value)

	return new Intl.DateTimeFormat(locale, {
		dateStyle: 'medium',
		timeStyle: 'short'
	}).format(date)
}
