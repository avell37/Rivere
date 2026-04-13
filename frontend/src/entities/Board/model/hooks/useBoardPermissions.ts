'use client'
import { useGetUser } from '@/entities/User'

export const useBoardPermissions = (boardId: string) => {
	const { data: userData } = useGetUser()

	const member = userData?.boards?.find(brd => brd.boardId === boardId)

	return {
		isOwner: member?.role === 'OWNER'
	}
}
