'use client'
import { useTranslations } from 'next-intl'

import { Animate, AnimateGroup } from '@/shared/ui/custom'

import { advantageCards } from '../../model/lib/advantage.mapper'

export const AdvantagesSection = () => {
	const t = useTranslations('home')
	const advantages = advantageCards(t)

	const [first, second, ...rest] = advantages

	return (
		<section className='py-24'>
			<div className='max-w-6xl mx-auto px-4'>
				<Animate animation='fadeUp' className='text-center mb-16'>
					<h2 className='text-4xl lg:text-5xl font-bold text-white mb-4'>
						{t('secondSection.title')}
					</h2>
				</Animate>
				<AnimateGroup
					stagger={0.07}
					delayStart={0.05}
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
				>
					<Animate
						animation='fadeUp'
						className='lg:col-span-2 flex flex-col justify-between
						bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/8
						p-8 hover:border-white/15 transition-all duration-300'
					>
						<div>
							<div
								className={`inline-flex p-3 rounded-xl mb-6 ${first.wrapperIconClassname}`}
							>
								<span className='[&>svg]:w-5 [&>svg]:h-5'>
									{first.icon}
								</span>
							</div>
							<h3 className='text-2xl font-semibold text-white mb-3'>
								{first.title}
							</h3>
							<p className='text-zinc-400 leading-relaxed'>
								{first.description}
							</p>
						</div>
						<div className='mt-8 flex gap-1.5'>
							<div className='h-1 flex-1 rounded-full bg-linear-to-r from-blue-500 to-indigo-500' />
							<div className='h-1 w-16 rounded-full bg-zinc-700/60' />
							<div className='h-1 w-10 rounded-full bg-zinc-700/40' />
						</div>
					</Animate>
					<Animate
						animation='fadeUp'
						className='bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/8
						p-8 hover:border-white/15 transition-all duration-300'
					>
						<div
							className={`inline-flex p-3 rounded-xl mb-6 ${second.wrapperIconClassname}`}
						>
							<span className='[&>svg]:w-5 [&>svg]:h-5'>
								{second.icon}
							</span>
						</div>
						<h3 className='text-xl font-semibold text-white mb-3'>
							{second.title}
						</h3>
						<p className='text-zinc-400 text-sm leading-relaxed'>
							{second.description}
						</p>
					</Animate>
					{rest.map(adv => (
						<Animate
							key={adv.key}
							animation='fadeUp'
							className='bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/8
							p-8 hover:border-white/15 transition-all duration-300'
						>
							<div
								className={`inline-flex p-3 rounded-xl mb-6 ${adv.wrapperIconClassname}`}
							>
								<span className='[&>svg]:w-5 [&>svg]:h-5'>
									{adv.icon}
								</span>
							</div>
							<h3 className='text-xl font-semibold text-white mb-3'>
								{adv.title}
							</h3>
							<p className='text-zinc-400 text-sm leading-relaxed'>
								{adv.description}
							</p>
						</Animate>
					))}
				</AnimateGroup>
			</div>
		</section>
	)
}
