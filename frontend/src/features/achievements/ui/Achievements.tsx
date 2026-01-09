'use client'
import { useGetAchievements } from '../model/hooks/useGetAchievements'

import { AchievementListSkeleton } from './AchievementListSkeleton'
import { AchievementList } from './AchievementsList'

export const Achievements = () => {
	const { data, isLoading } = useGetAchievements()

	if (!data || isLoading) {
		return (
			<div className='flex flex-col gap-4 p-4'>
				<h1 className='text-2xl font-bold'>Ваши достижения</h1>
				<div className='flex flex-wrap gap-4 p-4'>
					<AchievementListSkeleton />
				</div>
			</div>
		)
	}

	return (
		<div className='flex flex-col gap-5 p-4'>
			<h1 className='text-2xl font-bold'>
				Ваши достижения {data.length}/34:
			</h1>
			<div className='flex flex-wrap gap-4 p-4'>
				<AchievementList achievements={data} />
			</div>
		</div>
	)
}
