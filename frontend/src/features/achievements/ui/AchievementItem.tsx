import { Modal } from '@/shared/ui/custom'

interface AchievementItemProps {
	icon: React.ReactNode
	title: string
	description: string
	date: string
}

export const AchievementItem = ({
	icon,
	title,
	description,
	date
}: AchievementItemProps) => {
	return (
		<Modal
			trigger={
				<div className='flex flex-col items-center justify-center cursor-pointer'>
					{icon}
					<p>{title}</p>
				</div>
			}
			contentClassname='max-w-md'
		>
			<div className='flex flex-col items-center justify-center gap-3'>
				{icon}
				<p>{title}</p>
				<span className='text-gray-400 text-xs'>{description}</span>
				<span className='text-gray-400 text-xs'>{date}</span>
			</div>
		</Modal>
	)
}
