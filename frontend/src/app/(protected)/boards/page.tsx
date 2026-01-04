import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { BoardList } from '@/entities/Board/ui/BoardList'

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations('boards')

	return {
		title: t('heading')
	}
}

export default function BoardsPage() {
	const t = useTranslations('boards')

	return (
		<div className='flex justify-center py-8 px-4'>
			<div className='flex flex-col gap-4 w-full max-w-[900px]'>
				<div className='flex justify-between items-center'>
					<h3 className='font-bold text-xl'>{t('title')}</h3>
				</div>
				<BoardList />
			</div>
		</div>
	)
}
