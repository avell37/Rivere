'use client'
import { BarChart3, SlidersHorizontal, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { Button, Separator } from '@/shared/ui/external'

import { Advantage } from './Advantage'
import { MainHeader } from './MainHeader'

export const Main = () => {
	const t = useTranslations('home')

	return (
		<div className='min-h-screen'>
			<MainHeader t={t} />

			<section className='max-w-6xl mx-auto px-4 pt-20 pb-32'>
				<div className='pt-10'>
					<h1 className='text-5xl font-bold mb-6 max-lg:text-3xl'>
						{t('startSection.title')}{' '}
						<span>{t('startSection.name')}</span>
					</h1>
					<p className='text-lg opacity-80 max-w-2xl mb-10 max-lg:text-sm'>
						{t('startSection.description')}
					</p>

					<div className='flex flex-col sm:flex-row gap-4'>
						<Link href='auth/login'>
							<Button className='cursor-pointer'>
								{t('startSection.login')}
							</Button>
						</Link>
						<Link href='auth/register'>
							<Button className='cursor-pointer'>
								{t('startSection.register')}
							</Button>
						</Link>
					</div>
				</div>
			</section>

			<Separator />

			<section className='py-24'>
				<div className='max-w-6xl mx-auto px-4'>
					<h2 className='text-4xl font-bold mb-14'>
						{t('secondSection.title')}
					</h2>

					<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
						<Advantage
							title={t('secondSection.firstCard.title')}
							text={t('secondSection.firstCard.description')}
							icon={<Sparkles />}
						/>
						<Advantage
							title={t('secondSection.secondCard.title')}
							text={t('secondSection.secondCard.description')}
							icon={<SlidersHorizontal />}
						/>
						<Advantage
							title={t('secondSection.thirdCard.title')}
							text={t('secondSection.thirdCard.description')}
							icon={<BarChart3 />}
						/>
					</div>
				</div>
			</section>

			<Separator />

			<section className='py-20 text-center'>
				<h3 className='text-3xl font-semibold mb-4'>
					{t('thirdSection.title')}
				</h3>
				<p className='mb-8'>{t('thirdSection.description')}</p>
				<Link href='auth/register'>
					<Button className='cursor-pointer'>
						{t('thirdSection.register')}
					</Button>
				</Link>
			</section>
		</div>
	)
}
