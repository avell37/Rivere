import { Bell } from 'lucide-react'

interface NotificationItemProps {
	message: string
	read: boolean
	createdAt: string
}

export const NotificationItem = ({
	message,
	read,
	createdAt
}: NotificationItemProps) => {
	return (
		<div
			className={`relative flex items-center gap-4 border rounded-md p-6 shadow mx-2 ${read ? 'opacity-60' : ''}`}
		>
			<div className='rounded p-3 bg-zinc-700 w-[50px]'>
				<Bell />
			</div>
			<div>
				<p>{message}</p>
				<span className='absolute bottom-2 right-2 text-xs'>
					{new Date(createdAt).toLocaleString()}
				</span>
			</div>
		</div>
	)
}
