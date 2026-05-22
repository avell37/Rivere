'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { ActionResponse } from '@/shared/types'
import { handleApiError } from '@/shared/utils'

import {
	banUser,
	getAllUsers,
	setUserRole,
	unbanUser
} from '../api/admin-users.api'
import { BanUserInput, UsersResponse } from '../types/AdminUserTypes'

export const adminKeys = {
	allUsers: () => ['get-all-users'],
	allUsersPage: (page: number) => ['get-all-users', page],
	banUser: (userId: string) => ['ban-user', userId],
	unbanUser: (userId: string) => ['unban-user', userId],
	changeRole: (userId: string) => ['change-role-user', userId]
}

export const useGetAllUsers = (page: number) => {
	const { data, isLoading, error } = useQuery<UsersResponse, AxiosError>({
		queryKey: adminKeys.allUsersPage(page),
		queryFn: () => getAllUsers(Number(page)),
		placeholderData: prev => prev
	})

	return {
		data,
		isLoading,
		error
	}
}

export const useSetBanUser = (userId: string) => {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const {
		mutate: banUserWithReason,
		isPending,
		isError
	} = useMutation<ActionResponse, AxiosError, BanUserInput>({
		mutationKey: adminKeys.banUser(userId),
		mutationFn: (data: BanUserInput) => banUser(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: adminKeys.allUsers() })
		},
		onError: err => handleApiError(err, t)
	})

	return {
		banUserWithReason,
		isPending,
		isError
	}
}

export const useUnbanUser = (userId: string) => {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const {
		mutate: removeBan,
		isPending,
		isError
	} = useMutation<ActionResponse, AxiosError, void>({
		mutationKey: adminKeys.unbanUser(userId),
		mutationFn: () => unbanUser(userId),
		onSuccess: () => {
			toast.success(t('admin.users.actions.userUnbanned'))
			queryClient.invalidateQueries({ queryKey: adminKeys.allUsers() })
		},
		onError: err => handleApiError(err, t)
	})

	return {
		removeBan,
		unbanPending: isPending,
		isError
	}
}

export const useSetUserRole = (userId: string) => {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const {
		mutate: changeRole,
		isPending,
		isError
	} = useMutation<ActionResponse, AxiosError, string>({
		mutationKey: adminKeys.changeRole(userId),
		mutationFn: (role: string) => setUserRole(userId, role),
		onSuccess: () => {
			toast.success(t('admin.users.actions.userChangeRole'))
			queryClient.invalidateQueries({ queryKey: adminKeys.allUsers() })
		},
		onError: err => handleApiError(err, t)
	})

	return {
		changeRole,
		isPending,
		isError
	}
}
