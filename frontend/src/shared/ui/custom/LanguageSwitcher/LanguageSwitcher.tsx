'use client'
import Cookies from 'js-cookie'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '../../external'

export const LanguageSwitcher = () => {
	const [language, setLanguage] = useState<string>('')
	const t = useTranslations('language')

	useEffect(() => {
		const savedLang = Cookies.get('language')
		if (savedLang) {
			setLanguage(savedLang)
		}
	}, [])

	const handleSwitchLanguage = (value: string) => {
		setLanguage(value)
		Cookies.set('language', value)
		window.location.reload()
	}

	return (
		<Select
			value={language}
			defaultValue={language}
			onValueChange={handleSwitchLanguage}
		>
			<SelectTrigger className='w-[180px] border px-2 py-1 rounded hover:bg-custom-hover transition-all'>
				<SelectValue placeholder={t('selectLanguage')} />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='ru'>
					<div className='flex items-center gap-1'>
						<Image
							src='/icons/ru.svg'
							alt='RU'
							width={18}
							height={18}
						/>
						{t('ru')}
					</div>
				</SelectItem>
				<SelectItem value='en'>
					<div className='flex items-center gap-1'>
						<Image
							src='/icons/us.svg'
							alt='RU'
							width={18}
							height={18}
						/>
						{t('en')}
					</div>
				</SelectItem>
			</SelectContent>
		</Select>
	)
}
