'use client'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { Animate } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

interface CardMockProps {
	title: string
	tag?: string
	tagClass?: string
	highlighted?: boolean
	done?: boolean
}

const CardMock = ({
	title,
	tag,
	tagClass,
	highlighted,
	done
}: CardMockProps) => (
	<div
		className={`rounded-lg p-2.5 border transition-all ${
			highlighted
				? 'bg-indigo-950/60 border-indigo-500/25 shadow-[0_0_10px_rgba(99,102,241,0.12)]'
				: done
					? 'bg-zinc-800/20 border-white/5 opacity-50'
					: 'bg-zinc-800/60 border-white/5'
		}`}
	>
		<p
			className={`text-[12px] font-medium leading-tight ${done ? 'text-zinc-500 line-through' : 'text-white'}`}
		>
			{title}
		</p>
		{tag && !done && (
			<div className='mt-1.5'>
				<span
					className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${tagClass}`}
				>
					{tag}
				</span>
			</div>
		)}
	</div>
)

const KanbanPreview = () => (
	<div className='relative w-full max-w-[500px]'>
		<div className='absolute inset-0 bg-indigo-600/15 blur-3xl rounded-3xl scale-90 pointer-events-none' />
		<div className='relative bg-zinc-900/90 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl overflow-hidden'>
			<div className='flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-zinc-800/40'>
				<div className='w-2.5 h-2.5 rounded-full bg-red-500/75' />
				<div className='w-2.5 h-2.5 rounded-full bg-yellow-500/75' />
				<div className='w-2.5 h-2.5 rounded-full bg-green-500/75' />
				<span className='ml-2 text-[11px] text-zinc-500 font-medium'>
					My Project — Board
				</span>
			</div>
			<div className='p-4 flex gap-3'>
				<div className='flex-1 flex flex-col gap-2 min-w-0'>
					<div className='flex items-center gap-1.5 px-0.5 mb-0.5'>
						<div className='w-1.5 h-1.5 rounded-full bg-zinc-500' />
						<span className='text-[10px] font-semibold uppercase tracking-wider text-zinc-500'>
							Backlog
						</span>
					</div>
					<CardMock
						title='Design system'
						tag='Design'
						tagClass='bg-blue-500/20 text-blue-300'
					/>
					<CardMock
						title='Write docs'
						tag='Medium'
						tagClass='bg-amber-500/20 text-amber-300'
					/>
				</div>
				<div className='flex-1 flex flex-col gap-2 min-w-0'>
					<div className='flex items-center gap-1.5 px-0.5 mb-0.5'>
						<div className='w-1.5 h-1.5 rounded-full bg-indigo-400' />
						<span className='text-[10px] font-semibold uppercase tracking-wider text-indigo-400'>
							Progress
						</span>
					</div>
					<CardMock
						title='Landing page'
						tag='High'
						tagClass='bg-red-500/20 text-red-300'
						highlighted
					/>
					<CardMock
						title='Auth system'
						tag='Medium'
						tagClass='bg-amber-500/20 text-amber-300'
						highlighted
					/>
				</div>
				<div className='flex-1 flex flex-col gap-2 min-w-0'>
					<div className='flex items-center gap-1.5 px-0.5 mb-0.5'>
						<div className='w-1.5 h-1.5 rounded-full bg-green-400' />
						<span className='text-[10px] font-semibold uppercase tracking-wider text-green-400'>
							Done
						</span>
					</div>
					<CardMock title='DB setup' done />
					<CardMock title='CI / CD' done />
				</div>
			</div>
			<div className='px-4 py-3 border-t border-white/5 bg-zinc-800/20 flex items-center gap-4'>
				<div className='flex items-center gap-1.5'>
					<div className='w-1.5 h-1.5 rounded-full bg-green-400' />
					<span className='text-[10px] text-zinc-500'>2 done</span>
				</div>
				<div className='flex items-center gap-1.5'>
					<div className='w-1.5 h-1.5 rounded-full bg-indigo-400' />
					<span className='text-[10px] text-zinc-500'>
						2 in progress
					</span>
				</div>
				<div className='flex items-center gap-1.5'>
					<div className='w-1.5 h-1.5 rounded-full bg-zinc-500' />
					<span className='text-[10px] text-zinc-500'>2 backlog</span>
				</div>
			</div>
		</div>
	</div>
)

export const HeroSection = () => {
	const t = useTranslations('home')

	return (
		<section className='max-w-6xl mx-auto px-4 pt-28 pb-16 lg:pb-24'>
			<div className='flex flex-col lg:flex-row items-center gap-12 lg:gap-20'>
				<div className='flex-1 flex flex-col items-center text-center lg:items-start lg:text-left max-w-xl'>
					<Animate animation='blurUp' delay={0} duration={0.65}>
						<h1 className='text-5xl lg:text-[4.25rem] font-bold leading-[1.08] tracking-tight mb-6 text-white'>
							{t('startSection.title')}{' '}
							<span className='bg-clip-text text-transparent bg-linear-to-br from-indigo-400 via-violet-400 to-purple-500'>
								{t('startSection.name')}
							</span>
						</h1>
					</Animate>
					<Animate animation='fadeUp' delay={0.18}>
						<p className='text-lg text-zinc-400 leading-relaxed mb-10 max-w-lg'>
							{t('startSection.description')}
						</p>
					</Animate>
					<Animate animation='fadeUp' delay={0.3}>
						<div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
							<Link href='auth/register'>
								<Button
									size='lg'
									className='bg-indigo-600 hover:bg-indigo-500 text-white w-full sm:w-auto shadow-lg shadow-indigo-500/20'
								>
									{t('startSection.register')}
									<ArrowRight className='ml-2 w-4 h-4' />
								</Button>
							</Link>
							<Link href='auth/login'>
								<Button
									size='lg'
									className='bg-white/10 border-white/10 text-white hover:bg-white/5 hover:text-white w-full sm:w-auto'
								>
									{t('startSection.login')}
								</Button>
							</Link>
						</div>
					</Animate>
				</div>
				<Animate
					animation='fadeRight'
					delay={0.2}
					duration={0.7}
					className='flex-1 flex justify-center lg:justify-end w-full max-lg:hidden'
				>
					<KanbanPreview />
				</Animate>
			</div>
		</section>
	)
}
