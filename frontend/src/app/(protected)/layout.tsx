'use client'

import { useGetUser } from '@/entities/User/model/hooks/useGetUser'

import { useNotifications } from '@/features/notifications/model/hooks/useNotifications'

import { SidebarProvider } from '@/shared/ui/external/Sidebar/ui/Sidebar'

import { Header } from '@/widgets/Header/Header'
import { MainSidebar } from '@/widgets/Sidebars/main/MainSidebar'

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
