import { X } from 'lucide-react'

import { SessionProps } from '../model/types/SessionProps'

export const SessionItem = ({
	title,
	description,
	span,
	isCurrent,
	icon,
	currentSession,
	onTerminate
}: SessionProps) => {
	return (
		<div className='group relative flex justify-between gap-4 hover:bg-black rounded-sm p-4 transition-all'>
			<div className='flex items-center gap-4'>
				{icon}
				<div className='flex flex-col'>
					<p>{title}</p>
					<span className='text-xs text-gray-400'>{description}</span>
					<span className='text-xs text-gray-400'>{span}</span>
				</div>
			</div>
			<div className='flex items-center'>
				{!isCurrent && onTerminate ? (
					<X
						className='absolute right-2 stroke-red-500 cursor-pointer 
						size-5 opacity-0 group-hover:opacity-100 transition-all'
						onClick={onTerminate}
					/>
				) : (
					<span className='text-xs text-gray-400'>
						{currentSession}
					</span>
				)}
			</div>
		</div>
	)
}
