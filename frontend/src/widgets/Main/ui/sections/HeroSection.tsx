'use client'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { Button } from '@/shared/ui/external'

export const HeroSection = () => {
	const t = useTranslations('home')

	return (
		<section className='max-w-6xl mx-auto px-4 pt-20 pb-32'>
			<div className='flex flex-col items-center text-center pt-10'>
				<h1 className='text-7xl font-bold mb-6 max-lg:text-3xl text-white'>
					{t('startSection.title')}{' '}
					<span>{t('startSection.name')}</span>
				</h1>
				<p className='text-xl opacity-80 max-w-2xl mb-10 max-lg:text-sm text-white'>
					{t('startSection.description')}
				</p>

				<div className='flex flex-col sm:flex-row gap-4'>
					<Link href='auth/register'>
						<Button
							variant='outline'
							size='lg'
							className='cursor-pointer'
						>
							{t('startSection.register')}
						</Button>
					</Link>
				</div>
			</div>
		</section>
	)
}
