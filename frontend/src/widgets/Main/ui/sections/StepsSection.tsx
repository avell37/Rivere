'use client'
import { LayoutDashboard, Pencil, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Animate, AnimateGroup } from '@/shared/ui/custom'

export const StepsSection = () => {
	const t = useTranslations('home')

	const steps = [
		{
			number: '01',
			icon: <Pencil className='w-5 h-5 text-white' />,
			title: t('thirdSection.firstStep.title'),
			description: t('thirdSection.firstStep.description'),
			gradient: 'from-indigo-600 to-indigo-500',
			glow: 'shadow-indigo-500/30'
		},
		{
			number: '02',
			icon: <LayoutDashboard className='w-5 h-5 text-white' />,
			title: t('thirdSection.secondStep.title'),
			description: t('thirdSection.secondStep.description'),
			gradient: 'from-violet-600 to-violet-500',
			glow: 'shadow-violet-500/30'
		},
		{
			number: '03',
			icon: <Sparkles className='w-5 h-5 text-white' />,
			title: t('thirdSection.thirdStep.title'),
			description: t('thirdSection.thirdStep.description'),
			gradient: 'from-purple-600 to-purple-500',
			glow: 'shadow-purple-500/30'
		}
	]

	return (
		<section className='py-24'>
			<div className='max-w-6xl mx-auto px-4'>
				<Animate animation='fadeUp' className='text-center mb-16'>
					<h2 className='text-4xl lg:text-5xl font-bold text-white mb-4'>
						{t('thirdSection.heading')}
					</h2>
				</Animate>
				<AnimateGroup
					stagger={0.1}
					delayStart={0.05}
					className='relative grid grid-cols-1 md:grid-cols-3 gap-6'
				>
					<div className='hidden md:block absolute top-10 left-[calc(16.66%+2.5rem)] right-[calc(16.66%+2.5rem)] h-px bg-linear-to-r from-indigo-500/50 via-violet-500/50 to-purple-500/50' />
					{steps.map(step => (
						<Animate
							key={step.number}
							animation='fadeUp'
							className='flex flex-col items-center text-center gap-6'
						>
							<div
								className={`relative z-10 w-20 h-20 rounded-2xl bg-linear-to-br ${step.gradient}
								flex items-center justify-center shadow-xl ${step.glow} shrink-0`}
							>
								{step.icon}
								<span className='absolute -top-2 -right-2 text-[10px] font-bold bg-zinc-950 border border-white/10 text-zinc-400 px-1.5 py-0.5 rounded-md'>
									{step.number}
								</span>
							</div>
							<div className='bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/8 p-6 w-full hover:border-white/15 transition-all duration-300'>
								<h3 className='text-xl font-semibold text-white mb-3'>
									{step.title}
								</h3>
								<p className='text-zinc-400 text-sm leading-relaxed'>
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
