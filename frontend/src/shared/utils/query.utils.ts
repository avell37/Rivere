type OffsetPage = {
	total: number
	items: unknown[]
}

export const getOffsetNextPageParam = <T extends OffsetPage>(
	lastPage: T,
	allPages: T[]
) => {
	const loaded = allPages.reduce(
		(total, page) => total + page.items.length,
		0
	)

	return loaded < lastPage.total ? loaded : undefined
}

export const parsePageParam = (
	searchParams: URLSearchParams,
	key = 'page',
	defaultPage = 1
) => {
	const page = Number(searchParams.get(key) ?? String(defaultPage))

	return Number.isFinite(page) && page > 0 ? page : defaultPage
}

export const parseEnumFilter = <T extends string>(
	value: string | null,
	allowed: readonly T[],
	fallback: T | 'all' = 'all'
): T | 'all' => {
	if (value && allowed.includes(value as T)) {
		return value as T
	}

	return fallback
}

export const buildQueryString = (
	params: Record<string, string | number | undefined | null>
) => {
	const searchParams = new URLSearchParams()

	for (const [key, value] of Object.entries(params)) {
		if (value === undefined || value === null || value === '') continue
		if (value === 'all') continue

		searchParams.set(key, String(value))
	}

	return searchParams.toString()
}
