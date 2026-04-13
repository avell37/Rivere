'use client'
import { Moon, PaletteIcon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'

import {
	Button,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger
} from '../../external'

interface ThemeSwitcherProps {
	variant?: 'dropdown' | 'alone'
}

export const ThemeSwitcher = ({ variant = 'dropdown' }: ThemeSwitcherProps) => {
	const t = useTranslations('dropdownUserMenu.theme')
	const { setTheme } = useTheme()

	const iconClass =
		variant === 'alone'
			? 'text-white group-hover:text-white/60 transition-all duration-200'
			: ''

	const themeVariants = [
		{
			code: 'light',
			label: t('light'),
			icon: <Sun className={iconClass} />
		},
		{
			code: 'dark',
			label: t('dark'),
			icon: <Moon className={iconClass} />
		}
	]

	if (variant === 'alone') {
		return (
			<div className='flex items-center gap-1'>
				{themeVariants.map(variant => (
					<Button
						key={variant.code}
						variant='none'
						size='none'
						onClick={() => setTheme(variant.code)}
						className='cursor-pointer group'
					>
						{variant.icon}
					</Button>
				))}
			</div>
		)
	}

	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger>
				<PaletteIcon />
				{t('heading')}
			</DropdownMenuSubTrigger>
			<DropdownMenuPortal>
				<DropdownMenuSubContent className='w-10'>
					<DropdownMenuGroup>
						<DropdownMenuLabel className='text-xs text-gray-400'>
							{t('heading')}
						</DropdownMenuLabel>
						{themeVariants.map(variant => (
							<DropdownMenuItem
								key={variant.code}
								onClick={() => setTheme(variant.code)}
								className='cursor-pointer'
							>
								{variant.icon}
								{variant.label}
							</DropdownMenuItem>
						))}
					</DropdownMenuGroup>
				</DropdownMenuSubContent>
			</DropdownMenuPortal>
		</DropdownMenuSub>
	)
}
