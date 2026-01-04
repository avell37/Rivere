import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { fetchBoardByIdServer } from '@/entities/Board/model/api/boardApi.server'

import { BoardView } from '@/widgets/BoardView/ui/BoardView'

interface Props {
	params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params

	const board = await fetchBoardByIdServer(id)
	const t = await getTranslations('board')

	return {
		title: t('heading', { name: board.title })
	}
}

export default async function BoardPage({ params }: Props) {
	const { id } = await params
	return <BoardView boardId={id} />
}
