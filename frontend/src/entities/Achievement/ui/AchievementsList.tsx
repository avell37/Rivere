import { IAchievement } from '../model/types/IAchievement'

import { AchievementItem } from './AchievementItem'

export const AchievementList = ({
	achievements
}: {
	achievements: IAchievement[]
}) => {
	return (
		<div className='flex flex-wrap gap-4'>
			{achievements?.map(item => (
				<AchievementItem key={item.id} {...item} />
			))}
		</div>
	)
}
