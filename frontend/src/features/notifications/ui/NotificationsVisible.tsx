'use client'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

import { NotificationBell } from '@/entities/Notification'

import { useIsMobile } from '@/shared/config'
import {
	Button,
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
	PopoverContent,
	PopoverMain,
	PopoverTrigger
} from '@/shared/ui/external'

import { Notifications } from './Notifications'

export const NotificationsVisible = () => {
	const isMobile = useIsMobile()

	if (isMobile) {
		return (
			<Drawer>
				<DrawerTrigger asChild>
					<Button variant='none' size='none'>
						<NotificationBell />
					</Button>
				</DrawerTrigger>
				<DrawerContent className='p-0 max-h-[85vh]'>
					<DrawerHeader>
						<VisuallyHidden>
							<DrawerTitle />
						</VisuallyHidden>
						<VisuallyHidden>
							<DrawerDescription />
						</VisuallyHidden>
					</DrawerHeader>
					<div className='overflow-y-auto'>
						<Notifications />
					</div>
				</DrawerContent>
			</Drawer>
		)
	}

	return (
		<PopoverMain>
			<PopoverTrigger asChild>
				<Button variant='none' size='none'>
					<NotificationBell />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[400px] p-0 max-h-[500px] overflow-y-auto z-100'>
				<Notifications />
			</PopoverContent>
		</PopoverMain>
	)
}
