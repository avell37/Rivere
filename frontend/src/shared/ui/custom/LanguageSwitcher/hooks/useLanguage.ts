'use client'
import Cookies from 'js-cookie'
import { useState } from 'react'

export const useLanguage = () => {
	const [language, setLanguage] = useState<string>(() => {
		const savedLang = Cookies.get('language')
		return savedLang || 'ru'
	})

	const changeLanguage = (value: string) => {
		setLanguage(value)
		Cookies.set('language', value)
		window.location.reload()
	}

	return {
		language,
		changeLanguage
	}
}
