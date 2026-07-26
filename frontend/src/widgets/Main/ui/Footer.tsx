'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

export const Footer = () => {
	const t = useTranslations('footer')

	return (
		<footer className='mt-8 border-t border-zinc-200/80 py-8 dark:border-white/5'>
			<div className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm md:flex-row'>
				<div className='text-zinc-500 dark:text-zinc-500'>
					{t('heading', { date: new Date().getFullYear() })}
				</div>
				<div className='flex gap-6'>
					<Link
						href='/terms'
						className='text-zinc-500 transition-colors hover:text-zinc-800 dark:hover:text-zinc-300'
					>
						{t('terms')}
					</Link>
					<Link
						href='/privacy'
						className='text-zinc-500 transition-colors hover:text-zinc-800 dark:hover:text-zinc-300'
					>
						{t('privacy')}
					</Link>
					<Link
						href='mailto:help@rivere.ru'
						className='text-zinc-500 transition-colors hover:text-zinc-800 dark:hover:text-zinc-300'
					>
						{t('contacts')}
					</Link>
				</div>
			</div>
		</footer>
	)
}
