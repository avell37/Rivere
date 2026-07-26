'use client'
import { useTranslations } from 'next-intl'

import { Animate, AnimateGroup } from '@/shared/ui/custom'
import { cn } from '@/shared/utils'

import { advantageCards } from '../../model/lib/advantage.mapper'

const cardClassName =
	'rounded-2xl border border-zinc-200/80 bg-white/70 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-indigo-200/80 dark:border-white/8 dark:bg-zinc-900/50 dark:shadow-none dark:hover:border-white/15'

export const AdvantagesSection = () => {
	const t = useTranslations('home')
	const advantages = advantageCards(t)

	const [first, second, ...rest] = advantages

	return (
		<section className='py-24'>
			<div className='mx-auto max-w-6xl px-4'>
				<Animate animation='fadeUp' className='mb-16 text-center'>
					<h2 className='mb-4 text-4xl font-bold text-zinc-900 lg:text-5xl dark:text-white'>
						{t('secondSection.title')}
					</h2>
				</Animate>
				<AnimateGroup
					stagger={0.07}
					delayStart={0.05}
					className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'
				>
					<Animate
						animation='fadeUp'
						className={cn(
							cardClassName,
							'flex flex-col justify-between lg:col-span-2'
						)}
					>
						<div>
							<div
								className={`mb-6 inline-flex rounded-xl p-3 ${first.wrapperIconClassname}`}
							>
								<span className='[&>svg]:h-5 [&>svg]:w-5'>
									{first.icon}
								</span>
							</div>
							<h3 className='mb-3 text-2xl font-semibold text-zinc-900 dark:text-white'>
								{first.title}
							</h3>
							<p className='leading-relaxed text-zinc-600 dark:text-zinc-400'>
								{first.description}
							</p>
						</div>
						<div className='mt-8 flex gap-1.5'>
							<div className='h-1 flex-1 rounded-full bg-linear-to-r from-blue-500 to-indigo-500' />
							<div className='h-1 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700/60' />
							<div className='h-1 w-10 rounded-full bg-zinc-100 dark:bg-zinc-700/40' />
						</div>
					</Animate>
					<Animate animation='fadeUp' className={cardClassName}>
						<div
							className={`mb-6 inline-flex rounded-xl p-3 ${second.wrapperIconClassname}`}
						>
							<span className='[&>svg]:h-5 [&>svg]:w-5'>
								{second.icon}
							</span>
						</div>
						<h3 className='mb-3 text-xl font-semibold text-zinc-900 dark:text-white'>
							{second.title}
						</h3>
						<p className='text-sm leading-relaxed text-zinc-600 dark:text-zinc-400'>
							{second.description}
						</p>
					</Animate>
					{rest.map(adv => (
						<Animate
							key={adv.key}
							animation='fadeUp'
							className={cardClassName}
						>
							<div
								className={`mb-6 inline-flex rounded-xl p-3 ${adv.wrapperIconClassname}`}
							>
								<span className='[&>svg]:h-5 [&>svg]:w-5'>
									{adv.icon}
								</span>
							</div>
							<h3 className='mb-3 text-xl font-semibold text-zinc-900 dark:text-white'>
								{adv.title}
							</h3>
							<p className='text-sm leading-relaxed text-zinc-600 dark:text-zinc-400'>
								{adv.description}
							</p>
						</Animate>
					))}
				</AnimateGroup>
			</div>
		</section>
	)
}
