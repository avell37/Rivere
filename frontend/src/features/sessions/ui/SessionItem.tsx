import { X } from 'lucide-react'

interface SessionProps {
	icon: React.ReactNode
	title: string
	date: string
	isCurrent?: boolean
	onTerminate?: () => void
}

export const SessionItem = ({
	icon,
	title,
	date,
	isCurrent,
	onTerminate
}: SessionProps) => {
	return (
		<div className='relative flex justify-between gap-4'>
			<div className='flex items-center gap-4'>
				{icon}
				<p>{title}</p>
			</div>
			<div className='flex items-center'>
				<span className='text-xs text-gray-400 mr-6'>{date}</span>
				{!isCurrent && onTerminate && (
					<X
						className='absolute -right-1 stroke-red-500 cursor-pointer size-5'
						onClick={onTerminate}
					/>
				)}
			</div>
		</div>
	)
}
