import { cookies } from 'next/headers'

import { SERVER_URL } from '@/shared/libs/constants/api.config'

export const fetchBoardByIdServer = async (id: string) => {
	const cookieStore = cookies()

	const response = await fetch(`${SERVER_URL}/boards/${id}`, {
		headers: {
			Cookie: (await cookieStore).toString()
		},
		cache: 'no-store'
	})

	if (!response.ok) {
		throw new Error('Ошибка при получении доски')
	}

	return response.json()
}
