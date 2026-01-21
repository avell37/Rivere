'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '../../../external'
import { useLanguage } from '../hooks/useLanguage'

import { LanguageSwitcherSkeleton } from './LanguageSwitcherSkeleton'

export const LanguageSwitcher = () => {
	const t = useTranslations('language')
	const { language, changeLanguage } = useLanguage()

	if (!language) return <LanguageSwitcherSkeleton />

	return (
		<Select
			value={language}
			defaultValue={language}
			onValueChange={changeLanguage}
		>
			<SelectTrigger className='w-[180px] border px-2 py-1 rounded hover:bg-custom-hover transition-all'>
				<SelectValue placeholder={t('selectLanguage')} />
			</SelectTrigger>
			<SelectContent className='z-100'>
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
