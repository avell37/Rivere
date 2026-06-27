import { IAchievement } from '../model/types/IAchievement'

import { AchievementItem } from './AchievementItem'

export const AchievementList = ({
	achievements
}: {
	achievements: IAchievement[]
}) => {
	return (
		<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3'>
			{achievements?.map(item => (
				<AchievementItem key={item.id} {...item} />
			))}
		</div>
	)
}
