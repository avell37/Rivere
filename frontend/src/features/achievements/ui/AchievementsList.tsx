import { IAchievement } from '../model/types/IAchievement'

import { AchievementItem } from './AchievementItem'

export const AchievementList = ({
	achievements
}: {
	achievements: IAchievement[]
}) => {
	return (
		<div>
			{achievements?.map(item => (
				<AchievementItem
					key={item.id}
					title={item.title}
					description={item.description}
				/>
			))}
		</div>
	)
}
