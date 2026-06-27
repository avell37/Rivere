'use client'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { Animate } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

export const StartSection = () => {
	const t = useTranslations('home')

	return (
		<section className='py-16 px-4'>
			<div className='max-w-4xl mx-auto'>
				<Animate animation='scaleIn' duration={0.6}>
					<div className='relative rounded-3xl overflow-hidden border border-indigo-500/20 p-12 md:p-16 text-center'>
						<div className='absolute inset-0 bg-linear-to-br from-indigo-600/15 via-violet-600/10 to-purple-600/15' />
						<div className='absolute inset-0 bg-zinc-900/60 backdrop-blur-sm' />
						<div className='absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-36 bg-indigo-500/25 blur-3xl pointer-events-none' />
						<div
							className='absolute inset-0 opacity-10'
							style={{
								backgroundImage:
									'radial-gradient(rgba(99,102,241,0.6) 1px, transparent 1px)',
								backgroundSize: '20px 20px'
							}}
						/>
						<div className='relative z-10'>
							<Animate animation='fadeUp' delay={0.15}>
								<h2 className='text-4xl lg:text-5xl font-bold text-white mb-5'>
									{t('fourthSection.title')}
								</h2>
							</Animate>
							<Animate animation='fadeUp' delay={0.25}>
								<p className='text-zinc-400 text-lg mb-10 max-w-md mx-auto leading-relaxed'>
									{t('fourthSection.description')}
								</p>
							</Animate>
							<Animate animation='fadeUp' delay={0.35}>
								<Link href='auth/register'>
									<Button
										size='lg'
										className='bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-500/25'
									>
										{t('fourthSection.register')}
										<ArrowRight className='ml-2 w-4 h-4' />
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
