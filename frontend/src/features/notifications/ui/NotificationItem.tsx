import { Bell } from 'lucide-react'
import { useLocale } from 'next-intl'

import { formatDate } from '@/shared/libs/formattedDate'

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
	const locale = useLocale()

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
					{formatDate(new Date(createdAt), locale)}
				</span>
			</div>
		</div>
	)
}
