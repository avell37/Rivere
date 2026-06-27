'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

export const Footer = () => {
	const t = useTranslations('footer')

	return (
		<footer className='border-t border-white/5 mt-8 py-8'>
			<div className='max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm'>
				<div className='text-zinc-500'>
					{t('heading', { date: new Date().getFullYear() })}
				</div>
				<div className='flex gap-6'>
					<Link
						href='/privacy'
						className='text-zinc-500 hover:text-zinc-300 transition-colors'
					>
						{t('privacy')}
					</Link>
					<Link
						href='mailto:help@rivere.ru'
						className='text-zinc-500 hover:text-zinc-300 transition-colors'
					>
						{t('contacts')}
					</Link>
				</div>
			</div>
		</footer>
	)
}
