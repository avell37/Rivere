import { AchievementsListProps } from '../model/types/AchievementProps'

import { AchievementItem } from './AchievementItem'

export const AchievementList = ({ achievements }: AchievementsListProps) => {
	return (
		<div className='flex gap-4'>
			{achievements?.map(item => (
				<AchievementItem key={item.id} {...item} />
			))}
		</div>
	)
}
