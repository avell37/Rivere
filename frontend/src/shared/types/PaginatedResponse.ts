export type PaginatedResponse<TItem, TKey extends string = 'items'> = {
	total: number
	page: number
	totalPages: number
} & Record<TKey, TItem[]>
