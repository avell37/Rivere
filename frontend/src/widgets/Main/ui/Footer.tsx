'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

export const Footer = () => {
	const t = useTranslations('footer')

	return (
		<footer className='border-t mt-20 py-8'>
			<div className='max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-80'>
				<div>{t('heading', { date: new Date().getFullYear() })}</div>
				<div className='flex gap-4'>
					<Link href='/privacy' className='hover:underline'>
						{t('privacy')}
					</Link>
					<Link
						href='mailto:help@rivere.ru'
						className='hover:underline'
					>
						{t('contacts')}
					</Link>
				</div>
			</div>
		</footer>
	)
}
