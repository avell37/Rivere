'use client'

import { useGetUser } from '@/entities/User'

import { useNotifications } from '@/features/notifications'

import { SidebarProvider } from '@/shared/ui/external'

import { Header, MainSidebar } from '@/widgets'

export default function Layout({ children }: { children: React.ReactNode }) {
	const { data } = useGetUser()
	useNotifications(data?.id)

	return (
		<SidebarProvider>
			<MainSidebar />
			<main className={`pt-16 flex-1`}>
				<Header />
				{children}
			</main>
		</SidebarProvider>
	)
}
