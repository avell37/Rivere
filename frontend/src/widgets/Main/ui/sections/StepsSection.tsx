'use client'
import { LayoutDashboard, Pencil, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Animate, AnimateGroup } from '@/shared/ui/custom'

export const StepsSection = () => {
	const t = useTranslations('home')

	const steps = [
		{
			number: '01',
			icon: <Pencil className='h-5 w-5 text-white' />,
			title: t('thirdSection.firstStep.title'),
			description: t('thirdSection.firstStep.description'),
			gradient: 'from-indigo-600 to-indigo-500',
			glow: 'shadow-indigo-500/30'
		},
		{
			number: '02',
			icon: <LayoutDashboard className='h-5 w-5 text-white' />,
			title: t('thirdSection.secondStep.title'),
			description: t('thirdSection.secondStep.description'),
			gradient: 'from-violet-600 to-violet-500',
			glow: 'shadow-violet-500/30'
		},
		{
			number: '03',
			icon: <Sparkles className='h-5 w-5 text-white' />,
			title: t('thirdSection.thirdStep.title'),
			description: t('thirdSection.thirdStep.description'),
			gradient: 'from-purple-600 to-purple-500',
			glow: 'shadow-purple-500/30'
		}
	]

	return (
		<section className='py-24'>
			<div className='mx-auto max-w-6xl px-4'>
				<Animate animation='fadeUp' className='mb-16 text-center'>
					<h2 className='mb-4 text-4xl font-bold text-zinc-900 lg:text-5xl dark:text-white'>
						{t('thirdSection.heading')}
					</h2>
				</Animate>
				<AnimateGroup
					stagger={0.1}
					delayStart={0.05}
					className='relative grid grid-cols-1 gap-6 md:grid-cols-3'
				>
					<div className='absolute top-10 right-[calc(16.66%+2.5rem)] left-[calc(16.66%+2.5rem)] hidden h-px bg-linear-to-r from-indigo-400/50 via-violet-400/50 to-purple-400/50 md:block dark:from-indigo-500/50 dark:via-violet-500/50 dark:to-purple-500/50' />
					{steps.map(step => (
						<Animate
							key={step.number}
							animation='fadeUp'
							className='flex flex-col items-center gap-6 text-center'
						>
							<div
								className={`relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br ${step.gradient} shadow-xl ${step.glow}`}
							>
								{step.icon}
								<span className='absolute -top-2 -right-2 rounded-md border border-zinc-200 bg-white px-1.5 py-0.5 text-[10px] font-bold text-zinc-500 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-400'>
									{step.number}
								</span>
							</div>
							<div className='w-full rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-indigo-200/80 dark:border-white/8 dark:bg-zinc-900/50 dark:shadow-none dark:hover:border-white/15'>
								<h3 className='mb-3 text-xl font-semibold text-zinc-900 dark:text-white'>
									{step.title}
								</h3>
								<p className='text-sm leading-relaxed text-zinc-600 dark:text-zinc-400'>
									{step.description}
								</p>
							</div>
						</Animate>
					))}
				</AnimateGroup>
			</div>
		</section>
	)
}
