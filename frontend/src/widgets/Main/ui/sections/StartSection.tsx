'use client'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { Animate } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

export const StartSection = () => {
	const t = useTranslations('home')

	return (
		<section className='px-4 py-16'>
			<div className='mx-auto max-w-4xl'>
				<Animate animation='scaleIn' duration={0.6}>
					<div className='relative overflow-hidden rounded-3xl border border-indigo-200/70 p-12 text-center md:p-16 dark:border-indigo-500/20'>
						<div className='absolute inset-0 bg-linear-to-br from-indigo-100/80 via-violet-100/50 to-purple-100/70 dark:from-indigo-600/15 dark:via-violet-600/10 dark:to-purple-600/15' />
						<div className='absolute inset-0 bg-white/75 backdrop-blur-sm dark:bg-zinc-900/60' />
						<div className='pointer-events-none absolute -top-16 left-1/2 h-36 w-72 -translate-x-1/2 bg-indigo-400/20 blur-3xl dark:bg-indigo-500/25' />
						<div
							className='absolute inset-0 opacity-20 dark:opacity-10'
							style={{
								backgroundImage:
									'radial-gradient(rgba(99,102,241,0.45) 1px, transparent 1px)',
								backgroundSize: '20px 20px'
							}}
						/>
						<div className='relative z-10'>
							<Animate animation='fadeUp' delay={0.15}>
								<h2 className='mb-5 text-4xl font-bold text-zinc-900 lg:text-5xl dark:text-white'>
									{t('fourthSection.title')}
								</h2>
							</Animate>
							<Animate animation='fadeUp' delay={0.25}>
								<p className='mx-auto mb-10 max-w-md text-lg leading-relaxed text-zinc-600 dark:text-zinc-400'>
									{t('fourthSection.description')}
								</p>
							</Animate>
							<Animate animation='fadeUp' delay={0.35}>
								<Link href='auth/register'>
									<Button
										size='lg'
										className='bg-indigo-600 text-white shadow-xl shadow-indigo-500/25 hover:bg-indigo-500'
									>
										{t('fourthSection.register')}
										<ArrowRight className='ml-2 h-4 w-4' />
									</Button>
								</Link>
							</Animate>
						</div>
					</div>
				</Animate>
			</div>
		</section>
	)
}
