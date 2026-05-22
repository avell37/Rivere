'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'

import {
	BoardUpdateMemberRoleRequest,
	IBoardMember,
	deleteMemberApi
} from '@/entities/Board'

import { ActionResponse } from '@/shared/types'
import { BoardRole, handleApiError } from '@/shared/utils'

import {
	getAllBoardMembersApi,
	updateMemberRoleApi
} from '../api/boardMemberApi'

export const boardMembersKeys = {
	getAll: (boardId: string) => ['get-all-board-members', boardId],
	updateMemberRole: (boardId: string) => ['update-member-role', boardId],
	deleteMember: ['delete-member']
}

export const useGetAllBoardMembers = (boardId: string) => {
	const {
		data: boardMembers,
		isPending: membersPending,
		isError
	} = useQuery<IBoardMember[], AxiosError>({
		queryKey: boardMembersKeys.getAll(boardId),
		queryFn: () => getAllBoardMembersApi(boardId)
	})

	return {
		boardMembers: boardMembers ?? [],
		membersPending,
		isError
	}
}

export const useUpdateMemberRole = (boardId: string) => {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const [pendingUserId, setPendingUserId] = useState<string | null>(null)

	const {
		mutate: changeRole,
		isPending: changeRolePending,
		isError
	} = useMutation<ActionResponse, AxiosError, BoardUpdateMemberRoleRequest>({
		mutationKey: boardMembersKeys.updateMemberRole(boardId),
		mutationFn: ({ userId, role }: { userId: string; role: BoardRole }) =>
			updateMemberRoleApi({ boardId, userId, role }),
		onSuccess: () => {
			toast.success(t('board.membersList.changeRole.success'))
			queryClient.invalidateQueries({
				queryKey: boardMembersKeys.getAll(boardId)
			})
		},
		onError: err => handleApiError(err, t)
	})

	const handleChangeRole = (userId: string) => (role: BoardRole) => {
		setPendingUserId(userId)
		changeRole(
			{ userId, role },
			{
				onSettled: () => {
					setPendingUserId(null)
				}
			}
		)
	}

	return {
		handleChangeRole,
		pendingUserId,
		changeRolePending,
		isError
	}
}

export const useDeleteMember = (boardId: string) => {
	const queryClient = useQueryClient()
	const t = useTranslations()

	const {
		mutate: removeMember,
		isPending: removeMemberPending,
		isError
	} = useMutation<ActionResponse, AxiosError, { userId: string }>({
		mutationKey: boardMembersKeys.deleteMember,
		mutationFn: ({ userId }) => deleteMemberApi(boardId, userId),
		onSuccess: () => {
			toast.success(t('board.deleteMember'))
			queryClient.invalidateQueries({
				queryKey: boardMembersKeys.getAll(boardId)
			})
		},
		onError: err => handleApiError(err, t)
	})

	return {
		removeMember,
		removeMemberPending,
		isError
	}
}
