'use client'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export const useLanguage = () => {
	const [language, setLanguage] = useState<string>('')

	useEffect(() => {
		const savedLang = Cookies.get('language')
		if (savedLang) {
			setLanguage(savedLang)
		} else setLanguage('ru')
	}, [])

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
