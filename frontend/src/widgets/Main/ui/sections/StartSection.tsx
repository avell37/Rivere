'use client'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { Button } from '@/shared/ui/external'

export const StartSection = () => {
	const t = useTranslations('home')

	return (
		<section className='py-20 text-center'>
			<h3 className='text-3xl font-semibold mb-4 text-white'>
				{t('fourthSection.title')}
			</h3>
			<p className='mb-8 text-white'>{t('fourthSection.description')}</p>
			<Link href='auth/register'>
				<Button variant='outline' className='cursor-pointer'>
					{t('fourthSection.register')}
				</Button>
			</Link>
		</section>
	)
}
