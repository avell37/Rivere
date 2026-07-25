import { ICard } from '@/entities/Card'

export const cardMatchesSearch = (card: ICard, query: string) => {
	const res = query.trim().toLowerCase()
	if (!res) return true

	if (card.title.toLowerCase().includes(res)) return true
	if (card.description?.toLowerCase().includes(res)) return true
	if (card.tags?.some(tag => tag.title.toLowerCase().includes(res)))
		return true
	if (card.assignee?.nickname.toLowerCase().includes(res)) return true

	return false
}
