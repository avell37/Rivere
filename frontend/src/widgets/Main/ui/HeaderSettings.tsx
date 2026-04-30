'use client'

import { Settings } from 'lucide-react'

import { LanguageSwitcher, ThemeSwitcher } from '@/shared/ui/custom'
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from '@/shared/ui/external'

export const HeaderSettings = () => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost'>
					<Settings />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent>
				<LanguageSwitcher />
				<ThemeSwitcher />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
