import { Trophy } from 'lucide-react'

import { AchievementItem } from './AchievementItem'

export const AchievementList = ({ ach }) => {
	return (
		<>
			{ach.map(item => (
				<AchievementItem
					key={item.id}
					icon={item.icon}
					title={item.title}
					description={item.description}
					date={item.date}
				/>
			))}
		</>
	)
}
