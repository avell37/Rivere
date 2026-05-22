'use client'
import { BoardPermission, hasPermission } from '@/shared/utils'

import { useGetBoard } from './useBoardQueries'

export const useBoardPermissions = (boardId: string) => {
	const { board } = useGetBoard(boardId)

	const role = board?.currentUserRole

	const can = (permission: BoardPermission) => {
		if (!role) return false

		return hasPermission(role, permission)
	}

	return {
		role,
		can
	}
}
