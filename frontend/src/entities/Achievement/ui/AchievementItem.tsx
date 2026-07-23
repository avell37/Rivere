'use client'
import { Check, Lock, Trophy } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

import { Modal } from '@/shared/ui/custom'
import { Progress } from '@/shared/ui/external'
import { cn, formatDate, formatTime } from '@/shared/utils'

import { AchievementItemProps } from '../model/types/AchievementProps'

export const AchievementItem = ({
	code,
	goal,
	progress,
	achievedAt
}: AchievementItemProps) => {
	const locale = useLocale()
	const t = useTranslations('achievements')

	const percent =
		goal > 0 ? Math.min(100, Math.round((progress / goal) * 100)) : 0
	const isEarned = achievedAt !== null

	return (
		<Modal
			trigger={
				<div
					className={cn(
						'group relative rounded-2xl border p-4 flex flex-col gap-3 cursor-pointer',
						'transition-all duration-200 hover:-translate-y-0.5',
						isEarned
							? 'border-amber-500/40 bg-amber-500/5 shadow-sm shadow-amber-500/10 hover:border-amber-500/60 hover:shadow-amber-500/20 hover:shadow-md'
							: 'border-border bg-card shadow-sm hover:border-muted-foreground/30 hover:bg-muted/40'
					)}
				>
					{isEarned && (
						<div className='absolute top-3 right-3 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center shadow-sm shadow-amber-500/50'>
							<Check className='size-2.5 text-black stroke-3' />
						</div>
					)}

					<div
						className={cn(
							'w-11 h-11 rounded-xl flex items-center justify-center shrink-0',
							isEarned
								? 'bg-amber-500/15 ring-1 ring-amber-500/25'
								: 'bg-muted ring-1 ring-border'
						)}
					>
						{isEarned ? (
							<Trophy className='size-5 text-amber-400' />
						) : (
							<Lock className='size-4 text-zinc-500' />
						)}
					</div>

					<div className='flex flex-col gap-1 flex-1 min-w-0'>
						<p
							className={cn(
								'text-sm font-semibold leading-tight',
								isEarned ? 'text-foreground' : 'text-zinc-500'
							)}
						>
							{t(`${code}.title`)}
						</p>
						<p className='text-xs text-muted-foreground leading-snug line-clamp-2'>
							{t(`${code}.description`)}
						</p>
					</div>

					<div className='flex flex-col gap-1.5 mt-auto'>
						<Progress
							value={percent}
							className={cn(
								'h-1.5',
								isEarned && '[&>div]:bg-amber-400'
							)}
						/>
						<span className='text-xs text-zinc-500'>
							{progress}/{goal}
						</span>
					</div>
				</div>
			}
			contentClassname='max-w-sm'
		>
			<div className='flex flex-col items-center gap-5 py-2'>
				<div
					className={cn(
						'w-20 h-20 rounded-2xl flex items-center justify-center',
						isEarned
							? 'bg-amber-500/15 ring-2 ring-amber-500/30 shadow-lg shadow-amber-500/20'
							: 'bg-muted ring-2 ring-border'
					)}
				>
					<Trophy
						className={cn(
							'size-9',
							isEarned ? 'text-amber-400' : 'text-zinc-500'
						)}
					/>
				</div>

				<div className='text-center flex flex-col gap-1.5'>
					<p className='text-lg font-bold'>{t(`${code}.title`)}</p>
					<p className='text-sm text-muted-foreground'>
						{t(`${code}.description`)}
					</p>
				</div>

				{achievedAt && (
					<div className='flex items-center gap-1.5 text-xs text-amber-400/80 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1'>
						<Check className='size-3' />
						{t('issuedAt', {
							date: formatDate(achievedAt, locale),
							time: formatTime(achievedAt, locale)
						})}
					</div>
				)}

				<div className='w-full flex flex-col gap-2'>
					<Progress
						value={percent}
						className={cn(
							'h-2',
							isEarned && '[&>div]:bg-amber-400'
						)}
					/>
					<div className='flex justify-between text-xs text-zinc-500'>
						<span>
							{progress}/{goal}
						</span>
						<span>{percent}%</span>
					</div>
				</div>
			</div>
		</Modal>
	)
}
