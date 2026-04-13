'use client'
import { Languages } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import {
	Button,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger
} from '../../../external'
import { useLanguage } from '../hooks/useLanguage'

interface LanguageSwitcherProps {
	variant?: 'dropdown' | 'alone'
}

export const LanguageSwitcher = ({
	variant = 'dropdown'
}: LanguageSwitcherProps) => {
	const t = useTranslations('dropdownUserMenu.language')
	const { changeLanguage } = useLanguage()

	const flagClass =
		variant === 'alone'
			? 'group-hover:opacity-70 transition-all duration-200'
			: ''

	const languages = [
		{ code: 'ru', label: t('ru'), flag: '/icons/ru.svg' },
		{ code: 'en', label: t('en'), flag: '/icons/us.svg' }
	]

	if (variant === 'alone') {
		return (
			<div className='flex items-center gap-2'>
				{languages.map(lang => (
					<Button
						key={lang.code}
						variant='none'
						size='none'
						onClick={() => changeLanguage(lang.code)}
						className='group cursor-pointer'
					>
						<Image
							src={lang.flag}
							alt={lang.code}
							width={18}
							height={18}
							className={flagClass}
						/>
					</Button>
				))}
			</div>
		)
	}

	return (
		<DropdownMenuSub>
			<DropdownMenuSubTrigger>
				<Languages />
				{t('heading')}
			</DropdownMenuSubTrigger>
			<DropdownMenuPortal>
				<DropdownMenuSubContent className='w-10'>
					<DropdownMenuGroup>
						<DropdownMenuLabel className='text-xs text-gray-400'>
							{t('heading')}
						</DropdownMenuLabel>
						{languages.map(lang => (
							<DropdownMenuItem
								key={lang.code}
								onClick={() => changeLanguage(lang.code)}
							>
								<Image
									src={lang.flag}
									alt={lang.code}
									width={18}
									height={18}
								/>
								{lang.label}
							</DropdownMenuItem>
						))}
					</DropdownMenuGroup>
				</DropdownMenuSubContent>
			</DropdownMenuPortal>
		</DropdownMenuSub>
	)
}
