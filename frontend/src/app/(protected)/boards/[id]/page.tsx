import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { fetchBoardByIdServer } from '@/entities/Board/model/api/boardApi.server'

import { Board } from '@/widgets/Kanban-board/ui/board/Board'

interface Props {
	params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	try {
		const { id } = await params

		const board = await fetchBoardByIdServer(id)
		const t = await getTranslations('board')

		return {
			title: t('heading', { name: board.title })
		}
	} catch (err) {
		return {
			title: 'Board'
		}
	}
}

export default async function BoardPage({ params }: Props) {
	const { id } = await params

	return <Board boardId={id} />
}
