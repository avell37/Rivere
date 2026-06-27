import { cookies } from 'next/headers'

import { COOKIE_NAME, defaultLanguage } from './config'

export async function getCurrentLanguage() {
	const cookiesStore = await cookies()

	const language = cookiesStore.get(COOKIE_NAME)?.value ?? defaultLanguage

	return language
}
