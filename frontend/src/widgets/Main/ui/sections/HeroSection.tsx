'use client'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { Animate } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'
import { cn } from '@/shared/utils'

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
		className={cn(
			'rounded-lg border p-2.5 transition-all',
			highlighted
				? 'border-indigo-300/80 bg-indigo-50 shadow-[0_0_10px_rgba(99,102,241,0.12)] dark:border-indigo-500/25 dark:bg-indigo-950/60'
				: done
					? 'border-zinc-200/80 bg-zinc-100/70 opacity-60 dark:border-white/5 dark:bg-zinc-800/20'
					: 'border-zinc-200/80 bg-white/90 dark:border-white/5 dark:bg-zinc-800/60'
		)}
	>
		<p
			className={cn(
				'text-[12px] font-medium leading-tight',
				done
					? 'text-zinc-400 line-through dark:text-zinc-500'
					: 'text-zinc-800 dark:text-white'
			)}
		>
			{title}
		</p>
		{tag && !done && (
			<div className='mt-1.5'>
				<span
					className={cn(
						'rounded px-1.5 py-0.5 text-[9px] font-medium',
						tagClass
					)}
				>
					{tag}
				</span>
			</div>
		)}
	</div>
)

const KanbanPreview = () => (
	<div className='relative w-full max-w-[500px]'>
		<div className='pointer-events-none absolute inset-0 scale-90 rounded-3xl bg-indigo-400/10 blur-3xl dark:bg-indigo-600/15' />
		<div className='relative overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/95 shadow-2xl backdrop-blur-sm dark:border-white/10 dark:bg-zinc-900/90'>
			<div className='flex items-center gap-1.5 border-b border-zinc-200/80 bg-zinc-100/80 px-4 py-3 dark:border-white/5 dark:bg-zinc-800/40'>
				<div className='h-2.5 w-2.5 rounded-full bg-red-500/75' />
				<div className='h-2.5 w-2.5 rounded-full bg-yellow-500/75' />
				<div className='h-2.5 w-2.5 rounded-full bg-green-500/75' />
				<span className='ml-2 text-[11px] font-medium text-zinc-500'>
					My Project — Board
				</span>
			</div>
			<div className='flex gap-3 p-4'>
				<div className='flex min-w-0 flex-1 flex-col gap-2'>
					<div className='mb-0.5 flex items-center gap-1.5 px-0.5'>
						<div className='h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500' />
						<span className='text-[10px] font-semibold uppercase tracking-wider text-zinc-500'>
							Backlog
						</span>
					</div>
					<CardMock
						title='Design system'
						tag='Design'
						tagClass='bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300'
					/>
					<CardMock
						title='Write docs'
						tag='Medium'
						tagClass='bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'
					/>
				</div>
				<div className='flex min-w-0 flex-1 flex-col gap-2'>
					<div className='mb-0.5 flex items-center gap-1.5 px-0.5'>
						<div className='h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400' />
						<span className='text-[10px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400'>
							Progress
						</span>
					</div>
					<CardMock
						title='Landing page'
						tag='High'
						tagClass='bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300'
						highlighted
					/>
					<CardMock
						title='Auth system'
						tag='Medium'
						tagClass='bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'
						highlighted
					/>
				</div>
				<div className='flex min-w-0 flex-1 flex-col gap-2'>
					<div className='mb-0.5 flex items-center gap-1.5 px-0.5'>
						<div className='h-1.5 w-1.5 rounded-full bg-green-500 dark:bg-green-400' />
						<span className='text-[10px] font-semibold uppercase tracking-wider text-green-600 dark:text-green-400'>
							Done
						</span>
					</div>
					<CardMock title='DB setup' done />
					<CardMock title='CI / CD' done />
				</div>
			</div>
			<div className='flex items-center gap-4 border-t border-zinc-200/80 bg-zinc-50/90 px-4 py-3 dark:border-white/5 dark:bg-zinc-800/20'>
				<div className='flex items-center gap-1.5'>
					<div className='h-1.5 w-1.5 rounded-full bg-green-500 dark:bg-green-400' />
					<span className='text-[10px] text-zinc-500'>2 done</span>
				</div>
				<div className='flex items-center gap-1.5'>
					<div className='h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400' />
					<span className='text-[10px] text-zinc-500'>
						2 in progress
					</span>
				</div>
				<div className='flex items-center gap-1.5'>
					<div className='h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500' />
					<span className='text-[10px] text-zinc-500'>2 backlog</span>
				</div>
			</div>
		</div>
	</div>
)

export const HeroSection = () => {
	const t = useTranslations('home')

	return (
		<section className='mx-auto max-w-6xl px-4 pt-28 pb-16 lg:pb-24'>
			<div className='flex flex-col items-center gap-12 lg:flex-row lg:gap-20'>
				<div className='flex max-w-xl flex-1 flex-col items-center text-center lg:items-start lg:text-left'>
					<Animate animation='blurUp' delay={0} duration={0.65}>
						<h1 className='mb-6 text-5xl leading-[1.08] font-bold tracking-tight text-zinc-900 lg:text-[4.25rem] dark:text-white'>
							{t('startSection.title')}{' '}
							<span className='bg-linear-to-br from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-purple-500'>
								{t('startSection.name')}
							</span>
						</h1>
					</Animate>
					<Animate animation='fadeUp' delay={0.18}>
						<p className='mb-10 max-w-lg text-lg leading-relaxed text-zinc-600 dark:text-zinc-400'>
							{t('startSection.description')}
						</p>
					</Animate>
					<Animate animation='fadeUp' delay={0.3}>
						<div className='flex w-full flex-col gap-3 sm:w-auto sm:flex-row'>
							<Link href='auth/register'>
								<Button
									size='lg'
									className='w-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 sm:w-auto'
								>
									{t('startSection.register')}
									<ArrowRight className='ml-2 h-4 w-4' />
								</Button>
							</Link>
							<Link href='auth/login'>
								<Button
									size='lg'
									className='w-full border border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50 sm:w-auto dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/5 dark:hover:text-white'
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
					className='flex w-full flex-1 justify-center max-lg:hidden lg:justify-end'
				>
					<KanbanPreview />
				</Animate>
			</div>
		</section>
	)
}
