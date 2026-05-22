'use client'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from '../../external'

interface AppDropdownProps {
	trigger: React.ReactNode
	children: React.ReactNode
	align?: 'start' | 'center' | 'end'
	contentClassname?: string
}

export const AppDropdown = ({
	trigger,
	children,
	align = 'end',
	contentClassname
}: AppDropdownProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
			<DropdownMenuContent align={align} className={contentClassname}>
				{children}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
