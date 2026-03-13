'use client'
import { useTranslations } from 'next-intl'

import {
	AchievementList,
	AchievementListSkeleton
} from '@/entities/Achievement'

import { useGetAchievements } from '../model/hooks/useGetAchievements'

export const Achievements = () => {
	const { achievements, earnedCount, isLoading } = useGetAchievements()
	const t = useTranslations('achievements')

	if (!achievements || isLoading) {
		return (
			<div className='flex flex-col gap-4 p-4'>
				<h1 className='text-2xl font-bold'>{t('loading')}</h1>
				<div className='flex flex-wrap gap-4 p-4'>
					<AchievementListSkeleton />
				</div>
			</div>
		)
	}

	return (
		<div className='flex flex-col gap-5 p-4'>
			<h1 className='text-2xl font-bold'>
				{t('title', {
					current: earnedCount,
					total: achievements.length
				})}
			</h1>
			<div className='flex flex-wrap gap-4 p-4'>
				<AchievementList achievements={achievements} />
			</div>
		</div>
	)
}
