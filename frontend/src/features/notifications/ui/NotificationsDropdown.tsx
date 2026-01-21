import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from '@/shared/ui/external'

import { NotificationBell } from './NotificationBell'
import { Notifications } from './Notifications'

export const NotificationsDropdown = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='none' size='none'>
					<NotificationBell />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-[400px] z-100'>
				<Notifications />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
