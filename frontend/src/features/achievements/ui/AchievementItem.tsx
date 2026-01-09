import { Trophy } from 'lucide-react'

import { Modal } from '@/shared/ui/custom'
import { Progress } from '@/shared/ui/external/Progress/Progress'

interface AchievementItemProps {
	title: string
	description: string
}

export const AchievementItem = ({
	title,
	description
}: AchievementItemProps) => {
	return (
		<Modal
			trigger={
				<div className='flex flex-col items-center justify-center cursor-pointer gap-2'>
					<Trophy className='size-14' />
					<p className='font-bold'>{title}</p>
				</div>
			}
			contentClassname='max-w-md'
		>
			<div className='flex flex-col items-center justify-center gap-3'>
				<Trophy className='size-20' />
				<p>{title}</p>
				<span className='text-gray-400 text-xs'>{description}</span>
				{/* <span className='text-gray-400 text-xs'>{date}</span> */}
				<div className='max-w-sm w-full text-center flex flex-col gap-4'>
					<Progress value={50} />
					<span>3/10</span>
				</div>
			</div>
		</Modal>
	)
}
