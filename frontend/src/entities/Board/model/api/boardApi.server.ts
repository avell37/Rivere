import { cookies } from 'next/headers'

import { SERVER_URL } from '@/shared/libs/constants/api.config'

import { IBoard } from '../types/IBoard'

export const fetchBoardByIdServer = async (id: string): Promise<IBoard> => {
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
