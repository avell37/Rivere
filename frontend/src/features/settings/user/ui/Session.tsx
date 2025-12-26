import { X } from 'lucide-react'

interface SessionProps {
	icon: React.ReactNode
	title: string
	date: string
}

export const Session = ({ icon, title, date }: SessionProps) => {
	return (
		<div className='flex justify-between gap-4'>
			<div className='flex gap-4'>
				{icon}
				<p>{title}</p>
			</div>
			<div className='flex items-center gap-4'>
				<span className='text-xs text-gray-400'>{date}</span>
				<X className='stroke-red-500 cursor-pointer' />
			</div>
		</div>
	)
}
