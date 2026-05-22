'use client'

import { Settings } from 'lucide-react'

import {
	AppDropdown,
	LanguageSwitcher,
	ThemeSwitcher
} from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

export const HeaderSettings = () => {
	return (
		<AppDropdown
			trigger={
				<Button variant='ghost'>
					<Settings />
				</Button>
			}
		>
			<LanguageSwitcher />
			<ThemeSwitcher />
		</AppDropdown>
	)
}
