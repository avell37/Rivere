'use client'
import { LayoutDashboard, Pencil, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { Button } from '@/shared/ui/external'

import { advantageCards } from '../model/lib/advantage.mapper'

import { Advantage, AdvantageWithStep } from './Advantage'
import { Footer } from './Footer'
import { MainHeader } from './MainHeader'

export const Main = () => {
	const t = useTranslations('home')
	const advantages = advantageCards(t)

	return (
		<div className='relative min-h-screen bg-zinc-950 overflow-hidden'>
			<div className='absolute inset-0 bg-linear-to-br from-zinc-950 via-indigo-950 to-zinc-900' />

			<div className='relative z-10'>
				<div className='min-h-screen'>
					<MainHeader />

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

					<section className='py-24 text-center'>
						<div className='max-w-6xl mx-auto px-4'>
							<h2 className='text-4xl font-bold mb-14 text-white'>
								{t('secondSection.title')}
							</h2>

							<div
								className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 *:lg:col-span-2
								[&>*:nth-last-child(-n+2)]:lg:col-span-3'
							>
								{advantages.map(advantage => (
									<Advantage
										key={advantage.key}
										title={advantage.title}
										text={advantage.description}
										icon={advantage.icon}
										iconBg={advantage.wrapperIconClassname}
									/>
								))}
							</div>
						</div>
					</section>

					<section className='py-20 text-center'>
						<div className='max-w-6xl mx-auto px-4'>
							<h2 className='text-4xl font-bold mb-14 text-white'>
								{t('thirdSection.heading')}
							</h2>
							<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
								<AdvantageWithStep
									step={1}
									stepIcon={<Pencil className='text-white' />}
									title={t('thirdSection.firstStep.title')}
									text={t(
										'thirdSection.firstStep.description'
									)}
								/>
								<AdvantageWithStep
									step={2}
									stepIcon={
										<LayoutDashboard className='text-white' />
									}
									title={t('thirdSection.secondStep.title')}
									text={t(
										'thirdSection.secondStep.description'
									)}
								/>
								<AdvantageWithStep
									step={3}
									stepIcon={
										<Sparkles className='text-white' />
									}
									title={t('thirdSection.thirdStep.title')}
									text={t(
										'thirdSection.thirdStep.description'
									)}
								/>
							</div>
						</div>
					</section>

					<section className='py-20 text-center'>
						<h3 className='text-3xl font-semibold mb-4 text-white'>
							{t('fourthSection.title')}
						</h3>
						<p className='mb-8 text-white'>
							{t('fourthSection.description')}
						</p>
						<Link href='auth/register'>
							<Button
								variant='outline'
								className='cursor-pointer'
							>
								{t('fourthSection.register')}
							</Button>
						</Link>
					</section>

					<Footer />
				</div>
			</div>
		</div>
	)
}
