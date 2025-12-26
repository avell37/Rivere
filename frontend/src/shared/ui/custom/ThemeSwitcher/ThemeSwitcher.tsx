'use client'
import { Moon, Sun } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '../../external/Select/Select'

export const ThemeSwitcher = () => {
	const t = useTranslations('theme')
	const { setTheme, theme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return (
			<div className='w-[180px] h-9 px-2 py-1 rounded border border-input bg-transparent flex items-center justify-between'>
				<span className='opacity-50'>{t('selectTheme')}</span>
			</div>
		)
	}

	return (
		<Select value={theme} onValueChange={setTheme}>
			<SelectTrigger className='w-[180px] px-2 py-1 rounded hover:bg-custom-hover transition-all'>
				<SelectValue placeholder={t('selectTheme')} />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='light'>
					<div className='flex items-center gap-2'>
						<Sun className='size-4' />
						{t('light')}
					</div>
				</SelectItem>
				<SelectItem value='dark'>
					<div className='flex items-center gap-2'>
						<Moon className='size-4' />
						{t('dark')}
					</div>
				</SelectItem>
			</SelectContent>
		</Select>
	)
}
