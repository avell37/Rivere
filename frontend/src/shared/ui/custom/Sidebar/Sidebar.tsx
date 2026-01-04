import React from 'react'

import {
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarMain,
	SidebarMenu
} from '../../external'

interface SidebarProps {
	headerContent?: React.ReactNode
	menuContent: React.ReactNode
}

export const Sidebar = ({ headerContent, menuContent }: SidebarProps) => {
	return (
		<SidebarMain>
			{headerContent && (
				<SidebarHeader className='py-4'>{headerContent}</SidebarHeader>
			)}
			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>{menuContent}</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
		</SidebarMain>
	)
}
