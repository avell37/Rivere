'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { TERMS_SECTIONS } from '../model/lib/terms-sections'

export const Terms = () => {
	const t = useTranslations('terms')

	return (
		<div className='max-w-3xl w-full mx-auto py-10 pt-25 px-4 space-y-8'>
			<header className='space-y-2 border-b pb-6'>
				<h1 className='text-3xl font-bold tracking-tight'>
					{t('heading')}
				</h1>
				<p className='text-sm text-muted-foreground'>
					{t('meta.effectiveDate')}
				</p>
				<p className='text-sm text-muted-foreground'>
					{t('meta.lastUpdated')}
				</p>
				<p className='text-sm leading-relaxed'>{t('intro')}</p>
			</header>

			{TERMS_SECTIONS.map(section => {
				const paragraphs = section.paragraphs
					? (t.raw(`${section.key}.paragraphs`) as string[])
					: []
				const items = section.items
					? (t.raw(`${section.key}.items`) as string[])
					: []

				return (
					<section key={section.key} className='space-y-3'>
						<h2 className='text-lg font-semibold'>
							{t(`${section.key}.heading`)}
						</h2>

						{paragraphs.map((paragraph, index) => (
							<p
								key={index}
								className='text-sm leading-relaxed text-muted-foreground'
							>
								{paragraph}
							</p>
						))}

						{items.length > 0 && (
							<ul className='list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground'>
								{items.map((item, index) => (
									<li key={index}>{item}</li>
								))}
							</ul>
						)}

						{section.key === 'contacts' && (
							<p className='text-sm leading-relaxed text-muted-foreground'>
								<Link
									href='mailto:help@rivere.ru'
									className='font-medium text-foreground underline underline-offset-4'
								>
									help@rivere.ru
								</Link>
							</p>
						)}
					</section>
				)
			})}
		</div>
	)
}
