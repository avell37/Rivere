import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { BoardView } from '@/widgets/BoardView/ui/BoardView'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('boards')

	return {
		title: t('heading')
	}
}

interface Props {
	params: { id: string }
}

export default async function BoardPage({ params }: Props) {
	const { id } = await params
	return <BoardView boardId={id} />
}
