'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { PUBLIC_URL } from '@/shared/libs'
import { ActionResponse } from '@/shared/types'
import { handleApiError } from '@/shared/utils'

import {
	changeEmailApi,
	changeNicknameApi,
	changePasswordApi,
	changeUsernameApi,
	getStatistics,
	getUser,
	logoutApi,
	uploadAvatarApi
} from '../api/userApi'
import { useUserStore } from '../store/useUserStore'
import { IUploadedAvatar, IUser } from '../types/IUser'
import { IUserStatistics } from '../types/IUserStatistics'
import { generateLastDays } from '../utils/generateLastDays'
import { ChangeEmailRequest } from '../validation/change-email.z.validation'
import { ChangeNicknameRequest } from '../validation/change-nickname.z.validation'
import { ChangePasswordRequest } from '../validation/change-password.z.validation'
import { ChangeUsernameRequest } from '../validation/change-username.z.validation'

export const userKeys = {
	statistics: ['statistics'],
	user: ['user-data'],
	changeEmail: ['change-email'],
	changeNickname: ['change-nickname'],
	changePassword: ['change-password'],
	changeUsername: ['change-username'],
	uploadAvatar: ['upload-avatar'],
	logout: ['logout-user']
}

export const useGetStatistics = () => {
	const {
		data: statistics,
		isPending: statisticsPending,
		error
	} = useQuery<IUserStatistics, AxiosError>({
		queryKey: userKeys.statistics,
		queryFn: getStatistics,
		retry: false
	})

	const days = generateLastDays(365, statistics?.dailyCompletedCards ?? {})

	return {
		days,
		statistics,
		statisticsPending,
		error
	}
}

export const useGetUser = () => {
	const setUser = useUserStore(state => state.setUser)

	const { data, status, error, isLoading } = useQuery<IUser, AxiosError>({
		queryKey: userKeys.user,
		queryFn: getUser,
		retry: false
	})

	useEffect(() => {
		if (data) setUser(data)
	}, [data, setUser])

	return {
		data,
		status,
		error,
		isLoading
	}
}

export const useChangeEmailMutation = () => {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const { mutate: changeEmail, isPending: changeEmailPending } = useMutation<
		ActionResponse,
		AxiosError,
		ChangeEmailRequest
	>({
		mutationKey: userKeys.changeEmail,
		mutationFn: changeEmailApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: userKeys.user })
		},
		onError: err => handleApiError(err, t)
	})

	return {
		changeEmail,
		changeEmailPending
	}
}

export const useChangeNicknameMutation = () => {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const { mutate: changeNickname, isPending: changeNicknamePending } =
		useMutation<ActionResponse, AxiosError, ChangeNicknameRequest>({
			mutationKey: userKeys.changeNickname,
			mutationFn: changeNicknameApi,
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: userKeys.user })
			},
			onError: err => handleApiError(err, t)
		})

	return {
		changeNickname,
		changeNicknamePending
	}
}

export const useChangePasswordMutation = () => {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const { mutate: changePassword, isPending: changePasswordPending } =
		useMutation<ActionResponse, AxiosError, ChangePasswordRequest>({
			mutationKey: userKeys.changePassword,
			mutationFn: changePasswordApi,
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: userKeys.user })
			},
			onError: err => handleApiError(err, t)
		})

	return {
		changePassword,
		changePasswordPending
	}
}

export const useChangeUsernameMutation = () => {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const { mutate: changeUsername, isPending: changeUsernamePending } =
		useMutation<ActionResponse, AxiosError, ChangeUsernameRequest>({
			mutationKey: userKeys.changeUsername,
			mutationFn: changeUsernameApi,
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: userKeys.user })
			},
			onError: err => handleApiError(err, t)
		})

	return {
		changeUsername,
		changeUsernamePending
	}
}

export const useUploadAvatarMutation = () => {
	const t = useTranslations()
	const queryClient = useQueryClient()

	const { mutate: uploadAvatar, isPending: uploadAvatarPending } =
		useMutation<IUploadedAvatar, AxiosError, File>({
			mutationKey: userKeys.uploadAvatar,
			mutationFn: uploadAvatarApi,
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: userKeys.user })
			},
			onError: err => handleApiError(err, t)
		})

	return {
		uploadAvatar,
		uploadAvatarPending
	}
}

export const useLogoutMutation = () => {
	const t = useTranslations()
	const router = useRouter()

	const { mutate: logout, isPending: logoutPending } = useMutation<
		ActionResponse,
		AxiosError,
		void
	>({
		mutationKey: userKeys.logout,
		mutationFn: logoutApi,
		onSuccess: () => {
			toast.success(t('account.logout'))
			router.push(`${PUBLIC_URL.login()}`)
		},
		onError: err => handleApiError(err, t)
	})

	return {
		logout,
		logoutPending
	}
}
