'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { handleApiError } from '@/shared/utils'

import { banUser, getAllUsers, setUserRole, unbanUser } from '../api/adminApi'
import { BanUserInput } from '../types/AdminUserTypes'

export const adminKeys = {
	allUsers: () => ['get-all-users'],
	allUsersPage: (page: number) => ['get-all-users', page],
	banUser: (userId: string) => ['ban-user', userId],
	unbanUser: (userId: string) => ['unban-user', userId],
	changeRole: (userId: string) => ['change-role-user', userId]
}

export const useGetAllUsers = (page: number) => {
	const { data, isLoading, error } = useQuery({
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
	} = useMutation({
		mutationKey: adminKeys.banUser(userId),
		mutationFn: (data: BanUserInput) => banUser(data),
		onSuccess: () => {
			toast.success(t('admin.users.actions.userBanned'))
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
	} = useMutation({
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
		isPending,
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
	} = useMutation({
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
