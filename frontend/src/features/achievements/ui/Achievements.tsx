'use client'
import { useTranslations } from 'next-intl'

import {
	AchievementList,
	AchievementListSkeleton
} from '@/entities/Achievement'

import { Button } from '@/shared/ui/external'

import { useGetAchievements } from '../model/hooks/useGetAchievements'

export const Achievements = () => {
	const {
		achievements,
		filteredAchievements,
		earnedCount,
		isLoading,
		filter,
		setFilter
	} = useGetAchievements()
	const t = useTranslations('achievements')

	if (!achievements || isLoading) {
		return (
			<div className='container mx-auto flex flex-col gap-4 p-8 px-0'>
				<h1 className='text-2xl font-bold'>{t('loading')}</h1>
				<div className='flex flex-wrap gap-4 p-4'>
					<AchievementListSkeleton />
				</div>
			</div>
		)
	}

	return (
		<div className='container mx-auto flex flex-col gap-5 p-8 px-0'>
			<h1 className='text-xl sm:text-2xl font-bold'>
				{t('title', {
					current: earnedCount,
					total: achievements.length
				})}
			</h1>
			<div className='flex gap-2'>
				<Button
					variant='outline'
					className={`${filter === 'all' ? 'font-bold scale-105' : ''} cursor-pointer`}
					onClick={() => setFilter('all')}
				>
					{t('filters.all')}
				</Button>
				<Button
					variant='outline'
					className={`${filter === 'earned' ? 'font-bold scale-105' : ''} cursor-pointer`}
					onClick={() => setFilter('earned')}
				>
					{t('filters.earned')}
				</Button>
				<Button
					variant='outline'
					className={`${filter === 'locked' ? 'font-bold scale-105' : ''} cursor-pointer`}
					onClick={() => setFilter('locked')}
				>
					{t('filters.locked')}
				</Button>
			</div>
			<AchievementList achievements={filteredAchievements} />
		</div>
	)
}
