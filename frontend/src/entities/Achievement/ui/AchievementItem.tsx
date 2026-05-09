import { Trophy } from 'lucide-react'
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
						'relative w-full rounded-xl border p-4 flex flex-col items-center gap-2 transition-all',
						'hover:scale-[1.05] hover:shadow-md cursor-pointer flex-1 min-w-[140px] max-w-[220px]',
						isEarned
							? 'border-yellow-500/40'
							: 'opacity-80 hover:opacity-100'
					)}
				>
					<Trophy
						className={cn(
							'size-14',
							isEarned
								? 'stroke-yellow-500'
								: 'dark:stroke-gray-400 opacity-40'
						)}
					/>
					<p className={`${!isEarned && 'opacity-40'}`}>
						{t(`${code}.title`)}
					</p>
					<div className='w-full'>
						<Progress value={percent} className='h-1' />
					</div>
					{isEarned && (
						<span className='absolute top-1 right-2'>✓</span>
					)}
				</div>
			}
			contentClassname='max-w-md'
		>
			<div className='flex flex-col items-center justify-center gap-4'>
				<Trophy
					className={cn(
						'size-20',
						isEarned
							? 'stroke-yellow-500'
							: 'stroke-gray-400 opacity-40'
					)}
				/>
				<p className='text-lg font-medium'>{t(`${code}.title`)}</p>
				<span className='text-black/90 dark:text-gray-400 text-sm'>
					{t(`${code}.description`)}
				</span>
				{achievedAt && (
					<span className='text-black/80 dark:text-gray-400 text-xs'>
						{t('issuedAt', {
							date: formatDate(achievedAt, locale),
							time: formatTime(achievedAt, locale)
						})}
					</span>
				)}
				<div className='max-w-sm w-full text-center flex flex-col gap-4'>
					<Progress value={percent} />
					<span className='text-black/80 dark:text-gray-400 text-sm'>
						{progress}/{goal} ({percent}%)
					</span>
				</div>
			</div>
		</Modal>
	)
}
