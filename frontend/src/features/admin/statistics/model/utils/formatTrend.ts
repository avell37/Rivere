export const formatTrend = (
	value: string | number,
	t: (key: string, values?: Record<string, any>) => string
) => {
	if (value === 0) {
		return t('admin.trendWithoutPlus', { count: 0 })
	}

	return t('admin.trendWithPlus', { count: value })
}
