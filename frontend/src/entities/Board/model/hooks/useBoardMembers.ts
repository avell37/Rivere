'use client'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

import { useUserStore } from '@/entities/User'

import { BoardPermission } from '@/shared/utils'

import { BoardMembersListProps } from '../types/BoardProps'

import { useDeleteMember, useUpdateMemberRole } from './useBoardMembersQueries'
import { useBoardPermissions } from './useBoardPermissions'

export const useBoardMembers = ({
	members,
	boardId
}: BoardMembersListProps) => {
	const { can } = useBoardPermissions(boardId)
	const [deleteMemberId, setDeleteMemberId] = useState<string | null>(null)
	const t = useTranslations('board.membersList')
	const locale = useLocale()
	const { removeMember, removeMemberPending } = useDeleteMember(boardId)
	const { handleChangeRole, pendingUserId } = useUpdateMemberRole(boardId)
	const { user } = useUserStore()

	const currentUserRole = members?.find(
		member => member.userId === user?.id
	)?.role

	const canManageRoles = can(BoardPermission.MANAGE_ROLES)
	const canDeleteMember = can(BoardPermission.KICK_USERS)

	return {
		user,
		pendingUserId,
		deleteMemberId,
		removeMemberPending,
		currentUserRole,
		canDeleteMember,
		canManageRoles,
		locale,
		t,
		removeMember,
		handleChangeRole,
		setDeleteMemberId
	}
}
